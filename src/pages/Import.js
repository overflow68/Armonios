
import style from './Import.module.css'
import { useState } from 'react'
import { useWallet } from '../contexts/walletContext'
import { useNavigate } from 'react-router-dom/dist'
export default function ImportWallet(){
    let [seed,setSeed] = useState()
   const {createWallet} = useWallet()
   const navigate = useNavigate()
    const createWalletAndRedir = ()=>{
        createWallet(seed)
        navigate('/')
    }
    
    
    return (
        <div className={style.import}>
            <div className={style.container}>
            <div className={style.title}>Insert your 12 word seed phrase</div>
            <textarea onChange={(e)=>setSeed(e.target.value)} className={style.text}></textarea>
            <button  className={style.button} onClick={createWalletAndRedir}>Import seed</button>
           </div>
        </div>
    )
}
