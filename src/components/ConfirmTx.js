import React, { useState, useEffect } from 'react';
import styles from './SendTx.module.css';
import {useWallet} from '../contexts/walletContext'
import axios from 'axios';
import BitcoinAnimation from './ConfirmedAnimation';


export default function ConfirmTx({tx,receiver,sats}){
  const [feeRate,setRate] = useState(10)
  const [transaction,setTx] = useState()
  const [payTo,setReceiver] = useState()
  const [satsAmount,setSats] = useState()
  const [sizeBytes,setSize] = useState(0)
  const [rawTx, setRaw] = useState("")
  const [allInputs,setVal] = useState(0)
  const [isConfirmed,setConfirmed] = useState(false)
  const {wallet} = useWallet()
  const [hash,setHash] = useState("")

  

  const [isLoading,setLoading]=useState(true)
  const handleSend = async () => {

    axios.post('https://blockstream.info/api/tx', rawTx)
  .then(response => {
    swapEndianness(transaction.hash)
    setConfirmed(true)
  })
  .catch(error => {
    alert("Something went wrong!")
  });
  };
  
  function swapEndianness(hexString) {
    // Remove any spaces or other non-hex characters from the input string
    hexString = hexString.replace(/\s/g, '');
  
    // Check if the hex string has an odd length, and if so, pad it with a leading zero
    if (hexString.length % 2 !== 0) {
      hexString = '0' + hexString;
    }
  
    // Split the hex string into pairs of characters (bytes)
    const bytes = hexString.match(/.{1,2}/g);
  
    // Reverse the order of bytes and join them back into a hex string
    const reversedHexString = bytes.reverse().join('');
  
    setHash(reversedHexString)
  }
  
  const handleCancel = ()=>{
    
  }

  useEffect(()=>{
    const getFee =(tx)=>{
      let totalInputVal = 0
      let totalOutputVal = 0
      tx.inputs.map(input=> totalInputVal +=input.witnessUtxo.value)
      tx.outputs.map(output=> output === null?null:totalOutputVal +=output.value)
      setSize(totalInputVal-totalOutputVal)
      setVal(totalInputVal)
     }
    if(tx){
getFee(tx)
    }
  },[])

  const getFee =(tx)=>{
   let totalInputVal = 0
   let totalOutputVal = 0
   tx.inputs.map(input=> totalInputVal +=input.witnessUtxo.value)
   tx.outputs.map(output=> output === null?null:totalOutputVal +=output.value)
   setSize(totalInputVal-totalOutputVal)
   
   setVal(totalInputVal)
  }
  const handleFeeRateChange = (e)=>{
    setRate(e.target.value)
     try {
      if(satsAmount + sizeBytes <= allInputs){
      const newTx = wallet.createTx(payTo,satsAmount,feeRate)
      setTx(newTx.jsonTx)
      setRaw(newTx.rawTx)
      getFee(newTx.jsonTx)
    }
     } catch (error) {
     }
      
       
    
   
    
  }

  useEffect(()=>{
    if(tx){
      setTx(tx)
      setReceiver(receiver)
      setSats(sats)
      setLoading(false)
    }
    
  },[])
 


  
  
    return(
      <>
      {!isLoading && !isConfirmed?
<div className={styles.container}>
      <h2>Confirm Transaction</h2>
      <div className={styles.transactionDetails}>
        <div className={styles.transactionSection}>
          <h3>Inputs</h3>
          <ul>
            {transaction.inputs.map((input, index) => (
              <li key={index}>{input.addr} - {input.witnessUtxo.value}</li>
            ))}
          </ul>
        </div>
        <div className={styles.transactionSection}>
          <h3>Outputs</h3>
          <ul>
            {transaction.outputs.map((output, index) => (
              output?<li key={index}>{output.receiver} - {output.value}</li>:null
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.amountAndFee}>
       
        <div className={styles.feeSection}>
          
          <p>Total Mining Fee: {sizeBytes} sats</p>
        </div>
      </div>
      <div className={styles.field}>
          <label htmlFor="feeRate">Fee Rate (sat/byte): {feeRate}</label>
          <input
            type="range"
            id="feeRate"
            min="1"
            max="100"
            step="1"
            value={feeRate}
            onChange={handleFeeRateChange}
          /> 
        </div>
      
        <div className={styles.buttons}>
         <button className={styles.sendButton} onClick={handleSend}>Broadcast</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      
       
    </div>
    :
    
    <div className={styles.container}>
      <h2>Confirm Transaction</h2>
     
      <div className = {styles.transactionDetails}>
        <div className={styles.transactionSection}>
          <ul>
          <h3 >Hash</h3>
            <li>{hash}</li>
          </ul>
        </div>

      
      </div>
      <div className={styles.transactionDetails}>
        <div className={styles.transactionSection}>
          <h3>Inputs</h3>
          <ul>
            {transaction?transaction.inputs.map((input, index) => (
              <li key={index}>{input.addr} - {input.witnessUtxo.value}</li>
            )):null}
          </ul>
        </div>
        <div className={styles.transactionSection}>
          <h3>Outputs</h3>
          <ul>
            {transaction?transaction.outputs.map((output, index) => (
              output?<li key={index}>{output.receiver} - {output.value}</li>:null
            )):null}
          </ul>
        </div>
      </div>
      <div className={styles.amountAndFee}>
       
        <div className={styles.feeSection}>
          
          <p>Total Mining Fee: {sizeBytes} sats</p>
        </div>
      </div>
     
      
        <BitcoinAnimation></BitcoinAnimation>
      
       
    </div>}
    </>
    )
}

