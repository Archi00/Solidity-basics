import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import {useMoralis} from "react-moralis"
import { useEffect } from "react"

interface contractAddressesInterface{
    [key:string]: string[]
}

export default function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const {chainId:chainIdHex,isWeb3Enabled}=useMoralis()
    const chainId:string = parseInt(chainIdHex!).toString()
    const raffleAddress = chainId in addresses?addresses[chainId][0] : null
    
    const {runContractFunction: enterRaffle} = useWeb3Contract({
      abi,
      contractAddress:raffleAddress!,
      functionName: "enterRaffle",
      params: {},
      msgValue:,
    })
    const {runContractFunction: getEntranceFee} = useWeb3Contract({
      abi,
      contractAddress:raffleAddress!,
      functionName: "getEntranceFee",
      params: {},
    })
    useEffect(()=>{
     if(isWeb3Enabled) {
      (async function(){
        await getEntranceFee()
      })()}
    },[isWeb3Enabled])
    return <div></div>
}
