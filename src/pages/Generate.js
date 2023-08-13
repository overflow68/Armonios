
import style from './Generate.module.css'
import { useNavigate } from 'react-router-dom/dist'
import { useState, useEffect } from 'react'
import {bip39} from '../contexts/armoni'
import { useWallet } from '../contexts/walletContext'

export default function GenerateWallet(){
    let [seed,setSeed] = useState()
    let navigate = useNavigate();
    const {createWallet,wallet} = useWallet()
    const createWalletAndRedir = ()=>{
        createWallet(seed.join(" "))
        console.log(wallet)
        navigate('/')
    }
    
    useEffect(()=>{
        
           const newSeed = bip39.generateMnemonic()
           
           setSeed(newSeed.split(" "))
       
    },[])
    

    
    return (
        <div className={style.import}>
            <div className={style.container}>
            <div className={style.title}>Back up your new seed phrase!</div>
            <div className={style.wordList}>
                {seed?seed.map((item,index)=>{
                    return <div key={index}>{`${index+1}-${item}`}</div>
                }):null}
            </div>
            <button  className={style.button} onClick={createWalletAndRedir}>All done!</button>
           </div>
        </div>
    )
}
