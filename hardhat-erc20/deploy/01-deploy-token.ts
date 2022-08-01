import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  VERIFICATION_BLOCK_CONFIRMATIONS,
  INITIAL_SUPPLY,
  devChains,
} from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  //@ts-ignore
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const ourToken = await deploy("OurToken", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: !devChains.includes(network.name)
      ? VERIFICATION_BLOCK_CONFIRMATIONS
      : 1,
  });

  if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Not in local network, verifying contract...");
    await verify(ourToken.address, [INITIAL_SUPPLY]);
  }
};

export default deployToken;
deployToken.tags = ["all"];
