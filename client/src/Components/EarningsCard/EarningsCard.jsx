import React from "react";
import styles from "./EarningsCard.module.css";

function EarningsCard() {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Earnings till date </p>
        <div className={styles.point} id={styles.earningsPoint}></div>
      </div>
      <h1>$3000</h1>
      <span>Your earnings till {new Date().toLocaleDateString()}</span>
      <br/>
      <br/>
      <button>Withdraw</button>
    </>
  );
}

export default EarningsCard;
