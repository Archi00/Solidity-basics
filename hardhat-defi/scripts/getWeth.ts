import { getNamedAccounts } from "hardhat"
async function getWeth() {
    const { deployer } = await getNamedAccounts()
}

export { getWeth }
