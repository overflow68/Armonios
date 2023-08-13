

import style from './Overview.module.css'
import {FaWallet} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import {BsQrCodeScan} from 'react-icons/bs'
import {FaBitcoin} from 'react-icons/fa'
import { useWallet } from '../contexts/walletContext'
import { useDynamic } from '../contexts/DynamicContext'


export default function Header(){
    const {setElem} = useDynamic()
    const [emptyAddress,setEmptyAddr] = useState()
    const [balance,setBalance] = useState()
    const {getBalance,wallet,setWallet} = useWallet()

    useEffect(()=>{
        const getEmptyAddressHandler =()=>{
            let copy = Object.assign(Object.create(Object.getPrototypeOf(wallet)), wallet)
            const newAddress = copy.getEmptyChangeAddr()
            setWallet(copy)
            
            
            setEmptyAddr(newAddress)
    
        }
        getEmptyAddressHandler()
        const getBalan = async () =>{
        const result = await getBalance()
        
        setBalance(result)
        
      } 
      getBalan()
    },[])
    
   
    return(
        <div className={style.container}>
        <div className={style.inputCont}>
            <FaWallet size={30} color={"#36454F"}/>
            <div className={style.address}>{emptyAddress}</div>
            <BsQrCodeScan size={30} color={"#36454F"} onClick={()=>{setElem("Qrcode",{address:emptyAddress})}}/>
            </div>
            <div className={style.balanceSend}>
                <div className={style.balance}>{balance} <FaBitcoin/></div>
                <div className={style.send}>
                    <button className={style.button} onClick={()=>setElem("SendTx")} >Send</button>
                    <button className={style.button } onClick={()=>setElem("Qrcode",{address:emptyAddress})}>Receive</button>
                </div>
            </div>
        </div>
    )
}
