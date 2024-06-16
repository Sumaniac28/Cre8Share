import React from "react";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
import styles from "./Top3Stocks.module.css";

function Top3Stocks({ creatorStocks }) {
  const top3Stocks = creatorStocks
    .map((stock) => ({
      ...stock,
      gain: stock.currentPrice - stock.listPrice,
    }))
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 3);

  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Top 3 performing stocks</p>
        <div className={styles.point} id={styles.top3stocksPoint}></div>
      </div>
      <CreatorStocks creatorStocks={top3Stocks} />
    </>
  );
}

export default Top3Stocks;

