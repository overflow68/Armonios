import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import style from './Qrcode.module.css'
import { useDynamic } from "../contexts/DynamicContext";

export default function QrCode(){
    const {values:{address}} = useDynamic()
    const [copied,setCopied] = useState(false)
    useEffect(()=>{
        setTimeout(function() {
          setCopied(false)
             }, 3000);
           },[copied])

           const copyToClipboard=()=>{
            navigator.clipboard.writeText(address)
            setCopied(true)
           }
    return(
        <div onClick={copyToClipboard} className={style.cont}>
        <QRCode size={220} value={address}/>
        <div   >
            {address}
        </div>
        {copied?<div className={style.copyAlert}>Copied to clipboard!</div>:null}
        </div>
    )
    
}
