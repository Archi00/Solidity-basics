import { BigNumber } from "ethers"
import { ethers, network } from "hardhat"
import { devChains } from "../helper-hardhat-config"
import { Raffle, VRFCoordinatorV2Mock } from "../typechain-types"
const { getContract } = ethers

async function mockKeepers() {
    const raffle: Raffle = await getContract("Raffle")
    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("")
    if (upkeepNeeded) {
        const tx = await raffle.performUpkeep("")
        const txReceipt = await tx.wait(1)
        const requestId = txReceipt.events![1].args!.requestId
        console.log(`Performed upkeep with requestId: ${requestId}`)
        if (devChains.includes(network.name)) {
            await mockVrf(requestId, raffle)
        } else {
            console.log("No upkeep needed!")
        }
    }
}

async function mockVrf(requestId: BigNumber, raffle: Raffle) {
    console.log("Local netowrk detected...")
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await getContract("VRFCoordinatorV2Mock")
    await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address)
    console.log("Responded")
    const recentWinner = await raffle.getRecentWinner()
    console.log(`The winner is: ${recentWinner}`)
}

mockKeepers()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
