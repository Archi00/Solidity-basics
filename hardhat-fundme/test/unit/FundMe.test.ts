import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { deployments, ethers, network } from "hardhat"
import { Address } from "hardhat-deploy/dist/types"
import { devChains } from "../../helper-hardhat-config"
import { FundMe, MockV3Aggregator } from "../../typechain-types"

describe("FundMe", async () => {
  let fundMe: FundMe
  let deployer: SignerWithAddress
  let MockV3Aggregator: MockV3Aggregator
  const sendValue: BigNumber = ethers.utils.parseEther("1")
  beforeEach(async () => {
    if (!devChains.includes(network.name)) {
      throw "You need to be on a development chain to run tests"
    }
    const accounts: SignerWithAddress[] = await ethers.getSigners()
    deployer = accounts[0]
    const deploys = await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe")
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator")
  })

  describe("constructor", async () => {
    it("Sets the aggregator addresses correctly", async () => {
      const response: Address = await fundMe.s_priceFeed()
      assert.equal(response, MockV3Aggregator.address)
    })
  })

  describe("fund", async () => {
    it("Fails if you don't send enough ETH", async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      )
    })
    it("Updated the amount funded data structure", async () => {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.s_addressToAmountFunded(deployer.address)
      assert.equal(response.toString(), sendValue.toString())
    })
    it("Adds funder to array of funders", async () => {
      await fundMe.fund({ value: sendValue })
      const funder: Address = await fundMe.s_funders(0)
      assert.equal(funder, deployer.address)
    })
  })

  describe("withdraw", async () => {
    beforeEach(async () => {
      await fundMe.fund({ value: sendValue })
    })

    it("Withdraw ETH from a single founder", async () => {
      const startingContractBalance: BigNumber =
        await fundMe.provider.getBalance(fundMe.address)
      const startingDeployerBalance: BigNumber =
        await fundMe.provider.getBalance(deployer.address)
      const transactionResponse: ContractTransaction = await fundMe.withdraw()
      const transactionReceipt: ContractReceipt =
        await transactionResponse.wait(1)
      const { effectiveGasPrice, gasUsed } = transactionReceipt
      const withdrawGasCost: BigNumber = gasUsed.mul(effectiveGasPrice)
      const finalContractBalance: BigNumber = await fundMe.provider.getBalance(
        fundMe.address
      )
      const finalDeployerBalance: BigNumber = await fundMe.provider.getBalance(
        deployer.address
      )

      assert.equal(finalContractBalance.toString(), "0")
      assert.equal(
        startingContractBalance.add(startingDeployerBalance).toString(),
        finalDeployerBalance.add(withdrawGasCost).toString()
      )
    })
  })
})
