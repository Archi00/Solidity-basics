import { getWeth } from "./getWeth"
import { getNamedAccounts } from "hardhat"
async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
}

async function getLendingPool() {}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
