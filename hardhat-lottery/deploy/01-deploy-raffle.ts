import {
    devChains,
    VERIFICATION_BLOCK_CONFIRMATIONS as WAIT_BLOCKS,
} from "../helper-hardhat-config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import { networkConfig } from "../helper-hardhat-config"

const deployRaffle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    let VRFCoordinatorV2Address
    log(network.name)

    if (devChains.includes(network.name)) {
        const VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        VRFCoordinatorV2Address = VRFCoordinatorV2Mock.address
    } else {
        VRFCoordinatorV2Address = networkConfig[network.name]["vrfCoordinatorV2"]
    }

    const args = [VRFCoordinatorV2Address]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: WAIT_BLOCKS,
    })
}

export default deployRaffle
