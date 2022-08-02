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
          describe("mint", function () {
              it("Counter gets updated", async () => {
                  const tx = await basicNft._mintNft()
                  await tx.wait(1)
                  const counter = (await basicNft.getTokenCounter()).toString()
                  assert.equal(counter, "1")
              })
          })
          describe("token URI", function () {
              it("returns the same ipfs CID", async () => {
                  const tx = await basicNft._mintNft()
                  await tx.wait(1)
                  const getIpfs = await basicNft.tokenURI(0)
                  assert.equal(getIpfs, await basicNft.TOKEN_URI())
              })
          })
      })
