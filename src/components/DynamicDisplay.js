import style from './Dynamic.module.css'
import QrCode from '../components/QrCode';
import SendTx from './SendTx';
import { useDynamic } from '../contexts/DynamicContext';
import Tx from './Tx'
export default function DynamicDisplay(){
    const{element,values} = useDynamic()
    if(element === "Qrcode"){
        return(
            <div className={style.dynamic}><QrCode value ={values.address}/></div>
             
         )
    }else if(element === "SendTx"){
        return(
        <div className={style.dynamic}><SendTx/></div>
        )
    }
    else if(element === "OpenTx"){
        return(
        <div className={style.dynamic}><Tx hash={values.hash} fee={values.fee} inputs={values.inputs} outputs={values.out} time ={values.time} /></div>
        )
    }
    else{
        return(
            <div className={style.dynamic}>Empty</div>
        )
    }
}
