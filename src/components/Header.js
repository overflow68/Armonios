
import logo from '../images/logo.png'
import style from './Header.module.css'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useWallet } from '../contexts/walletContext'
export default function Header(){
    const {wallet,setWallet} = useWallet()

    const handleDelete = ()=>{
        const firm = window.confirm("Are you sure you want to remove your wallet? It cannot be restored if you did not back it up")
        if (firm){
            setWallet(undefined)
            localStorage.removeItem("seed")
        }
        
    }
    return(
        <div className={style.header}>
        <img alt="logo" src={logo} height={60}></img>
        {wallet?<RiDeleteBin6Line onClick={handleDelete} size={60} className={style.bin}/>:null}
        </div>
    )
}
