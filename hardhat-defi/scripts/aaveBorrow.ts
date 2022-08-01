import { getWeth } from "./getWeth"
import { ethers, getNamedAccounts } from "hardhat"
async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
}

async function getLendingPool(account: string) {
    const lendingPoolAddressProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt(
        "ILendingPool",
        "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
        account
    )
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
