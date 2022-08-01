import { ethers } from "./ethers-5.2.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectBtn = document.querySelector("#connectBtn")
const fundBtn = document.querySelector("#fundBtn")
const balanceBtn = document.querySelector("#balance")
const withdrawBtn = document.querySelector("#withdraw")
connectBtn.onclick = connect
fundBtn.onclick = fund
balanceBtn.onclick = getBalance
withdrawBtn.onclick = withdraw

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

async function getBalance() {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(contractAddress)
    console.log(ethers.utils.formatEther(balance))
  }
}

async function fund() {
  const ethAmount = document.querySelector("#ethAmount").value
  if (typeof window.ethereum !== "undefined") {
    console.log(`Funding with: ${ethAmount}...`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
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
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations`
      )
      resolve()
    })
  })
}

async function withdraw() {
  if (window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const transactionResponse = await contract.withdraw()
      await listenForTransactionMine(transactionResponse, provider)
    } catch (e) {
      console.log(e)
    }
  }
}
