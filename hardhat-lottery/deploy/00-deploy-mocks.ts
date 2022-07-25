import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { devChains } from "../helper-hardhat-config"

const deployMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (devChains.includes(network.name)) {
        log("Using local network! Deploying mocks...")
    }
}

export default deployMocks
