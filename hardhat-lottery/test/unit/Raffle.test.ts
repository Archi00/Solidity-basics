import { devChains, networkConfig } from "../../helper-hardhat-config"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { Raffle, VRFCoordinatorV2Mock } from "../../typechain-types"
import { assert } from "chai"
import { BigNumber } from "ethers"

!devChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle: Raffle
          let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
          let interval: BigNumber

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
          })

          describe("constructor", function () {
              it("initializes the raffle correctly", async () => {
                  const raffleState = (await raffle.getRaffleState()).toString()
                  interval = await raffle.getInterval()
                  assert.equal(raffleState, "0")
                  // assert.equal(interval.toString(), networkConfig[network.name]["interval"])
              })
          })
      })
