import { devChains } from "../../helper-hardhat-config"
import { network } from "hardhat"
!devChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {})
