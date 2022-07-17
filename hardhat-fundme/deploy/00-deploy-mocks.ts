import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
  networkConfig,
  devChains,
  DECIMALS,
  INITIAL_ANSWER,
} from "../helper-hardhat-config"

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  if (devChains.includes(network.name)) {
    log("Using local network...")
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    })
    log("Mocks deployed!")
    log("-----------------------------------------------")
  }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
