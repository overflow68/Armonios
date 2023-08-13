
import { createContext,useContext,useEffect,useState } from "react";
import { redirect } from "react-router-dom";

const {Wallet,bip39}= require('./armoni.js')  


const walletContext = createContext()

export const useWallet =()=>{
    return useContext(walletContext)
}

export  function WalletProvider({children}){
    const[wallet,setWallet] = useState()
   
const createWallet=(seed)=>{
    const newWallet = new Wallet(seed)
    newWallet.generateAddresses(100,false)
    newWallet.generateAddresses(100,true)
    
    setWallet(newWallet)
}
const getEmptyAddress = ()=>{
    const allAddresses  = [...wallet.activeAddresses.receiving]
    for(let i = 0;allAddresses.length-1;i++){
        if (wallet.addressHistory[allAddresses[i]]==0){
            return allAddresses[i]
        }
    }
}

const getBalance = async ()=>{
    let copy = Object.assign(Object.create(Object.getPrototypeOf(wallet)), wallet)
   
    await copy.checkForTxs()
    let balance = 0
    copy.unspentCoins.map(coin=> balance+=coin.value)
    setWallet(copy)
    return balance
}

const  getTxHistory = async () =>{
   
    await wallet.checkForTxs()
    
    return wallet.txHistory
}

const value = {
    wallet,
    setWallet,
    createWallet,
    getEmptyAddress,
    getTxHistory,
    getBalance
   

}

useEffect(()=>{
    if ( !wallet ){
        redirect('/new-wallet')
    }
},[])

return(
    <walletContext.Provider value ={value}>
    {children}
    </walletContext.Provider>
)
}
