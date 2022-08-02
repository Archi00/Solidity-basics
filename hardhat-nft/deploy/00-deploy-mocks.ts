import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
import { devChains } from "../helper-hardhat-config"

const BASE_FEE = ethers.utils.parseEther("0.25") //Premium constant fee
const GAS_PRICE_LINK = 1e9

const deployMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (devChains.includes(network.name)) {
        log("Using local network! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args,
        })
        log("Mocks Deployed!")
        log("------------------------------")
    }
}

deployMocks.tags = ["all", "mocks"]
export default deployMocks
