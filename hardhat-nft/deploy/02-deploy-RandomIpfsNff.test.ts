import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { VRFCoordinatorV2Mock } from "../typechain-types"
import { devChains, networkConfig, waitBlockConfirmations } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

async function deployRandomIpfsNft() {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address: string
    let subId: string

    if (devChains.includes(network.name)) {
        const VRFCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )
        vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address
        const tx = await VRFCoordinatorV2Mock.createSubscription()
        const txReceipt = await tx.wait(1)
        subId = txReceipt.events![0].args!.subId
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId!]["vrfCoordinatorV2"]!
        subId = networkConfig[chainId!]["subId"]!
    }
}

deployRandomIpfsNft.tags = ["all", "random"]
export default deployRandomIpfsNft
