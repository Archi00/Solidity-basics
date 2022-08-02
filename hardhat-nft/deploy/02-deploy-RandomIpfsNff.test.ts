import { deployments, getNamedAccounts, network } from "hardhat"
import { devChains, waitBlockConfirmations } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

async function deployRandomIpfsNft() {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("------------------------------")
    const args: any[] = []
    const randomIpfsNft = await deploy("RandomIpfsNFt", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: !devChains.includes(network.name) ? waitBlockConfirmations : 1,
    })

    if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Not in a local network, verifying contract...")
        await verify(randomIpfsNft.address, args)
    }
    log("------------------------------")
}

deployRandomIpfsNft.tags = ["all", "random"]
export default deployRandomIpfsNft
