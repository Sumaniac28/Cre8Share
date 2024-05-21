import React from 'react'
import styles from './cre8shareCoins.module.css'
function Cre8shareCoins() {
  return (
    <div id={styles.UserInfoContainer}>
    <div id={styles.UserInfoCard}>
    <div className={styles.point} id={styles.coinsPoint}></div>
      <h1> Funds</h1>
      <div id={styles.coinBox}>
        <div id={styles.coins}>
            <p>4500 coins</p>
            <span>(These are Cre8Share coins, you can cash out them for real cash)</span>
        </div>
        <div id={styles.cashoutBtn}>
            <button>Add Funds</button>
            <button>Cash Out</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Cre8shareCoins;