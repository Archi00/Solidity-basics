import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { frontEndAddressesFile, frontEndAbisFile } from "../helper-hardhat-config"
import fs from "fs"

const updateFrontEnd: DeployFunction = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating contract addresses...")
        await updateContractAddresses()
        console.log("Updating abis...")
        await updateAbi()
        console.log("Constants updated!")
    }
}

const updateContractAddresses = async () => {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId?.toString()
    console.log(chainId)
    const currentAddresses = JSON.parse(fs.readFileSync(frontEndAddressesFile, "utf8"))
    if (chainId! in currentAddresses) {
        if (!currentAddresses[chainId!].includes(raffle.address)) {
            currentAddresses[chainId!].push(raffle.address)
        }
    } else {
        currentAddresses[chainId!] = [raffle.address]
    }
    fs.writeFileSync(frontEndAddressesFile, JSON.stringify(currentAddresses))
}

const updateAbi = async () => {
    const raffle: any = await ethers.getContract("Raffle")
    fs.writeFileSync(frontEndAbisFile, raffle.interface.format(ethers.utils.FormatTypes.json))
}

export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]
