import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert } from "chai"
import { deployments, ethers, network } from "hardhat"
import {
  Address,
  Deployment,
  DeploymentsExtension,
} from "hardhat-deploy/dist/types"
import { devChains } from "../../helper-hardhat-config"
import { FundMe, MockV3Aggregator } from "../../typechain-types"

describe("FundMe", async function () {
  let fundMe: FundMe
  let deployer: SignerWithAddress
  let MockV3Aggregator: MockV3Aggregator
  beforeEach(async function () {
    if (!devChains.includes(network.name)) {
      throw "You need to be on a development chain to run tests"
    }
    const accounts: SignerWithAddress[] = await ethers.getSigners()
    deployer = accounts[0]
    const deploys = await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
    ;(MockV3Aggregator = await ethers.getContract("MockV3Aggregator")), deployer
  })

  describe("constructor", async function () {
    it("Sets the aggregator addresses correctly", async function () {
      const response: Address = await fundMe.s_priceFeed()
      assert.equal(response, MockV3Aggregator.address)
    })
  })
})
