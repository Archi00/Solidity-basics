import { ContractTransaction } from "ethers"
import { ethers, getNamedAccounts } from "hardhat"

const main = async () => {
  const { deployer } = await getNamedAccounts()
  const fundMe = await ethers.getContract("FundMe", deployer)
  console.log("Funding contract...")
  const transactionResponse: ContractTransaction = await fundMe.fund({
    value: ethers.utils.parseEther("0.05"),
  })
  await transactionResponse.wait(1)
  console.log(
    `Contract at: ${
      fundMe.address
    } funded with ${0.05} ETH with ${deployer} account`
  )
}

main()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
