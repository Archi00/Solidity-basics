import { ethers } from "./ethers-5.2.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectBtn = document.querySelector("#connectBtn")
const fundBtn = document.querySelector("#fundBtn")
connectBtn.onclick = connect
fundBtn.onclick = fund

async function connect() {
  if (typeof window.ethereum === "undefined") {
    console.log("No Metamask")
    connectBtn.innerHTML = "Need to install metamask"
    return
  }

  await window.ethereum.request({ method: "eth_requestAccounts" })
  console.log("Connected to metamask!")
  connectBtn.innerHTML = "Connected"
}

async function fund() {
  const ethAmount = "1"
  if (typeof window.ethereum !== "undefined") {
    // console.log(`Funding with: ${ethAmount}...`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })
      await listenForTransactionMine(transactionResponse, provider)
    } catch (e) {
      console.log(e)
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`)
  return new Promise()
}
