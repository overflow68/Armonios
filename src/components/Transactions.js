import React, { useEffect,useState } from 'react';
import styles from './Transactions.module.css';
import { useWallet } from '../contexts/walletContext';
import { useDynamic } from '../contexts/DynamicContext';
 export default function Transactions() {
  const {getTxHistory} = useWallet()
  const [transactions,setTransactions] = useState([])
  const {setElem} = useDynamic()
 

  function unixTimeToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
  const openTxDetails = (transaction)=>{
    const{hash,time,inputs,out,fee} = transaction
    
setElem("OpenTx",{hash,time,inputs,out,fee})
  }

  useEffect(()=>{
    
    const txs = async () =>{
      const result = await getTxHistory()
       
      setTransactions(result)
      
    } 
    txs()

  },[])
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div onClick={getTxHistory} className={styles.headerCell}>Date</div>
        <div className={styles.headerCell}>Amount</div>
        <div className={styles.headerCell}>Current Balance</div>
      </div>
      <div className={styles.transactionContainer}>
        {transactions.map((transaction, index) => {
          const { time, result, balance } = transaction;
          

          return (
            <div onClick={()=> openTxDetails(transaction)} key={index} className={styles.dataRow}>
              <div  className={styles.dataCell}>{unixTimeToDate(time)}</div>
              <div className={styles.dataCell}>{result}</div>
              <div className={styles.dataCell}>{balance}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


