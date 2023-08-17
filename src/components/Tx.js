import React from "react";
import styles from  './SendTx.module.css'

export default function Tx({hash,fee,inputs,outputs,time}){


    function unixTimeToDate(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
      }

    
    return(
        <>
        <div className={styles.container}>
      <h2>Transaction</h2>
     
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
            {inputs?inputs.map((input, index) => (
              <li key={index}>{input.prev_out.addr} - {input.prev_out.value}</li>
            )):null}
          </ul>
        </div>
        <div className={styles.transactionSection}>
          <h3>Outputs</h3>
          <ul>
            {outputs?outputs.map((output, index) => (
              output?<li key={index}>{output.addr} - {output.value}</li>:null
            )):null}
          </ul>
        </div>
      </div>
      <div className={styles.amountAndFee}>
       
        <div className={styles.feeSection}>
          <p>Total Mining Fee: {fee} sats</p>
          <p>Date: {unixTimeToDate(time)}</p>
        </div>
      </div>
     
      
        
      
       
    </div>
        </>
    )
}


/*else if(element === "OpenTx"){
        return(
        <div className={style.dynamic}><Tx hash={values.hash} fee={values.fee} inputs={values.inputs} outputs={values.outputs} time ={values.time} /></div>
        )
    }*/
