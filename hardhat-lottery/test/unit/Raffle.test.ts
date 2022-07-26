import { devChains, networkConfig } from "../../helper-hardhat-config"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { Raffle, VRFCoordinatorV2Mock } from "../../typechain-types"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"

!devChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
          let raffle: Raffle
          let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
          let interval: BigNumber
          let entranceFee: BigNumber
          let deployer: string

          const { provider } = network

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              entranceFee = await raffle.getEntranceFee()
          })

          describe("constructor", function () {
              it("initializes the raffle correctly", async () => {
                  const raffleState = (await raffle.getRaffleState()).toString()
                  interval = await raffle.getInterval()
                  assert.equal(raffleState, "0")
                  assert.equal(interval.toString(), networkConfig[network.name]["interval"])
              })
          })
          describe("enterRaffle", () => {
              it("reverts when you don't pay enough", async () => {
                  await expect(raffle.enterRaffle()).to.be.revertedWith(
                      "Raffle__NotEnoughEthEntered"
                  )
              })
              it("records players when they enter", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  const player = await raffle.getPlayers(0)
                  assert.equal(player, deployer)
              })
              it("emits event on enter", async () => {
                  await expect(raffle.enterRaffle({ value: entranceFee })).to.emit(
                      raffle,
                      "RaffleEnter"
                  )
              })
              it("doesn't allow entrance when raffle is calculating", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.send("evm_mine", [])

                  await raffle.performUpkeep([])
                  await expect(raffle.enterRaffle({ value: entranceFee })).to.be.revertedWith(
                      "Raffle_NotOpen"
                  )
              })
          })
          describe("checkUpKeep", () => {
              it("returns false if players haven't sent any ETH", async () => {
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.send("evm_mine", [])
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                  assert(!upkeepNeeded)
              })
              it("returns false if raffle isn't open", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.send("evm_mine", [])
                  await raffle.performUpkeep([])
                  const raffleState = (await raffle.getRaffleState()).toString()
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                  assert.equal(raffleState, "1")
                  assert.equal(upkeepNeeded, false)
              })
              it("returns false if enough time hasn't passed", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() - 1])
                  await provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
                  assert(!upkeepNeeded)
              })
              it("returns true if enough time has passed, has players, eth, and is open", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
                  assert(upkeepNeeded)
              })
          })
          describe("performUpkeep", () => {
              it("can only run if checkupkeep returns true", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.request({ method: "evm_mine", params: [] })
                  const tx = await raffle.performUpkeep([])
                  assert(tx)
              })
              it("reverts when checkupkeep is false", async () => {
                  await expect(raffle.performUpkeep([])).to.be.revertedWith(
                      "Raffle_UpkeepNotNeeded"
                  )
              })
              it("updates the raffle state, emits an event, and calls the vrfCoordinator", async () => {
                  await raffle.enterRaffle({ value: entranceFee })
                  await provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await provider.request({ method: "evm_mine", params: [] })
                  const txResponse = await raffle.performUpkeep([])
                  const txReceipt = await txResponse.wait(1)
                  const requestId = txReceipt.events![1].args!.requestId
                  const raffleState = await raffle.getRaffleState()
                  assert(requestId.toNumber() > 0)
                  assert(raffleState == 1)
              })
          })
      })
