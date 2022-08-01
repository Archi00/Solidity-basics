import { getWeth, AMOUNT } from "./getWeth"
import { ethers, getNamedAccounts } from "hardhat"
import { BigNumber, Contract } from "ethers"
import { wethTokenAddress } from "../helper-hardhat-config"

async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const lendingPool = await getLendingPool(deployer)
    console.log(`Lending pool address ${lendingPool.address}`)
    await approveErc20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    console.log("Deposited!")
    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, deployer)
    const daiPrice = await getDaiPrice()
    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    console.log(`You can borrow ${amountDaiToBorrow} DAI`)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
}
async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x773616E4d11A78F511299002da57A0a94577F1f4"
    )
    const price = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`DAI/ETH price is ${price.toString()}`)
    return price
}

async function getBorrowUserData(lendingPool: Contract, account: string) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH deposited`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH `)
    return { availableBorrowsETH, totalDebtETH }
}

async function getLendingPool(account: string) {
    const lendingPoolAddressProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)
    return lendingPool
}

async function approveErc20(
    erc20Address: string,
    spenderAddress: string,
    amountToSpend: BigNumber,
    account: string
) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Approved")
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
