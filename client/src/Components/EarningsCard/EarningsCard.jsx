import React from "react";
import styles from "./EarningsCard.module.css";

function EarningsCard({earnings}) {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Earnings till date </p>
        <div className={styles.point} id={styles.earningsPoint}></div>
      </div>
      <h1>${earnings}</h1>
      <span>Your earnings till {new Date().toLocaleDateString()}</span>
      <br />
      <br />
      <button style={earnings===0 ? {cursor:'not-allowed'}: {cursor:'pointer'}} id={styles.withdrawButton}>Withdraw</button>
    </>
  );
}

export default EarningsCard;
