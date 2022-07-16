const { ethers } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Please wait, deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Depoyed contract to: ${simpleStorage.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(error)
        process.exit(1)
    })
