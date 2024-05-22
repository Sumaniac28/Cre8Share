import React from "react";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
import styles from "./Top3Stocks.module.css";
function Top3Stocks() {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Top 3 performing stocks</p>
        <div className={styles.point} id={styles.top3stocksPoint}></div>
      </div>
      <CreatorStocks />
    </>
  );
}

export default Top3Stocks;
