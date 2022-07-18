import { BigNumber, ContractTransaction } from "ethers"
import { ethers, getNamedAccounts } from "hardhat"

const main = async () => {
  const { deployer } = await getNamedAccounts()
  const fundMe = await ethers.getContract("FundMe", deployer)
  console.log("Withdrawing ETH from contract...")
  const transactionResponse: ContractTransaction = await fundMe.withdraw({
    gasLimit: 100000,
  })

  await transactionResponse.wait(1)
  console.log("ETH withdrawn successfully!")
}

main()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
