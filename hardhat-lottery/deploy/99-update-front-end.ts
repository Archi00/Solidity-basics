import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import fs from "fs"

const FRONT_END_ADDRESSES_FILE = "../../front-hardhat-lottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../../front-hardhat-lottery/constants/abi.json"

const updateFrontEnd: DeployFunction = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        updateContractAddresses()
    }
}

const updateContractAddresses = async () => {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId?.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId! in currentAddresses) {
        if (!currentAddresses[chainId!].includes(raffle.address)) {
            currentAddresses[chainId!].push(raffle.address)
        }
    } else {
        currentAddresses[chainId!] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

const updateAbi = async () => {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]
