
import style from './ImportGenerate.module.css'
import {FaSeedling} from 'react-icons/fa'
import {LuImport} from 'react-icons/lu'


import {Link} from 'react-router-dom'

export default function NewWallet(){
    
    
    return (
        <div className={style.import_generate}>
           
            <div className={style.button}>
                 <Link className={style.link} to={'/new-wallet/import'}>
                <LuImport  size={70}></LuImport>
                <div>Import seed</div>
               </Link>
            </div> 
            
            
            <div className={style.button}>
                <Link className={style.link} to={'/new-wallet/generate'}>
                <FaSeedling size={70}></FaSeedling>
                <div>Generate seed</div>
            </Link>
            </div>
            
        </div>
    )
}
