import React from 'react';
import { motion } from 'framer-motion';
import styles from './Confirmed.module.css';

const BitcoinAnimation = () => {
  return (
    <div className={styles['submission-container']}>
      <motion.div
        className={styles['check-icon']}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        &#10003;
      </motion.div>
      <motion.div
        className={styles['success-message']}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Transaction Broadcast!
      </motion.div>
    </div>
  );
};

export default BitcoinAnimation;
