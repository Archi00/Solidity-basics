import { devChains } from "../../helper-hardhat-config"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { BasicNft } from "../../typechain-types"
import { assert } from "chai"
!devChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          let deployer: string
          let basicNft: BasicNft
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["basic"])
              basicNft = await ethers.getContract("BasicNft", deployer)
          })
          describe("constructor", function () {
              it("Initializes correctly", async () => {
                  const counter = (await basicNft.getTokenCounter()).toString()
                  assert.equal(counter, "0")
              })
          })
      })
