import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { FundMe } from "../../typechain-types"
import { ethers, network } from "hardhat"
import { BigNumber } from "ethers"
import { devChains } from "../../helper-hardhat-config"
import { assert } from "chai"

devChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async () => {
      const { utils, getSigners, getContract } = ethers

      let fundMe: FundMe
      let deployer: SignerWithAddress
      const sendValue: BigNumber = utils.parseEther("0.1")

      beforeEach(async () => {
        const accounts: SignerWithAddress[] = await getSigners()
        deployer = accounts[0]
        fundMe = await getContract("FundMe", deployer)
      })

      it("Allows people to fund and withdraw", async () => {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw({ gasLimit: 100000 })
        const finalBalance: BigNumber = await fundMe.provider.getBalance(
          fundMe.address
        )
        assert.equal(finalBalance.toString(), "0")
      })
    })
