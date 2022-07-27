import { devChains } from "../../helper-hardhat-config"
import { ethers, getNamedAccounts, network } from "hardhat"
import { Raffle } from "../../typechain-types"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"

devChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
          let raffle: Raffle
          let entranceFee: BigNumber
          let deployer: string

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              entranceFee = await raffle.getEntranceFee()
          })
          describe("fullfillRandomWords", () => {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async () => {
                  const startingTimeStamp = await raffle.getLatestTimestamp()
                  const accounts = await ethers.getSigners()
                  await new Promise<void>(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerBalance = await accounts[0].getBalance()
                              const endingTimestamp = await raffle.getLatestTimestamp()

                              await expect(raffle.getPlayers(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerBalance.toString(),
                                  winnerStartingBalance.add(entranceFee).toString()
                              )
                              assert(endingTimestamp > startingTimeStamp)
                              resolve()
                          } catch (e) {
                              console.log(e)
                              reject(e)
                          }
                      })
                      const tx = await raffle.enterRaffle({ value: entranceFee })
                      await tx.wait(1)
                      const winnerStartingBalance = await accounts[0].getBalance()
                  })
              })
          })
      })
