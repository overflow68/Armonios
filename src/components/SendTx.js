import React, { useState, useEffect } from 'react';
import styles from './SendTx.module.css';
import {useWallet} from '../contexts/walletContext'
import ConfirmTx from './ConfirmTx';

const SATOSHI_TO_USD_CONVERSION_RATE = 0.00042;
export default function SendTx(){
  const [transaction,setTransaction] = useState()
    const [payTo, setPayTo] = useState('');
    const [amountSatoshis, setAmountSatoshis] = useState(0);
    const [amountUSD, setAmountUSD] = useState(0);
    const [feeRate, setFeeRate] = useState(10); // Default fee rate in sat/byte
    const [confScreen,setConfScreen] = useState(false)
    
    const {wallet} = useWallet()

  

    
  
    useEffect(() => {
      // Calculate the USD amount based on satoshis and conversion rate
      const usdAmount = amountSatoshis * SATOSHI_TO_USD_CONVERSION_RATE;
      setAmountUSD(usdAmount.toFixed(2));
    }, [amountSatoshis]);
    
  
    const handlePayToChange = (e) => {
      setPayTo(e.target.value);
    };
  
    const handleAmountChange = (e) => {
      setAmountSatoshis(e.target.value);
    };
  
   
  
    const handleSend = () => {

        const tx = wallet.createTx(payTo,Number(amountSatoshis),feeRate)
        if (typeof tx ==="string"){
          alert(tx)
          return
        }
        setTransaction(tx)
        setConfScreen(true)
     
    };
  
    const handleCancel = () => {
      // Implement canceling logic here
      setPayTo('');
      setAmountSatoshis(0);
      setFeeRate(10);
    };


    return (
      <>
      {!confScreen?<div className={styles.container}>
        
        <div className={styles.field}>
          <label htmlFor="payTo">Pay to:</label>
          <input
            type="text"
            id="payTo"
            value={payTo}
            onChange={handlePayToChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Amount (satoshis):</label>
          <input
            type="number"
            id="amount"
            value={amountSatoshis}
            onChange={handleAmountChange}
          />
          <div className={styles.conversion}>
            {amountUSD} USD
          </div>
        </div>
        
       
        <div className={styles.buttons}>
          <button className={styles.sendButton} onClick={handleSend}>Pay...</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          
        </div>
      </div>
      :
      <ConfirmTx tx={transaction.jsonTx} receiver={payTo} sats={Number(amountSatoshis)}/>}
      </>
    );
}


