import React from "react";
import styles from "./CreatorStocks.module.css";

function CreatorStocks({ creatorStocks }) {

  return (
    <>
      <div id={styles.stockListHeading}>
        <li>Name</li>
        <li>List Price</li>
        <li>Current Price</li>
        <li>Quantity</li>
        <li>Sold</li>
        <li>Gain/Loss</li>
      </div>
      <div id={styles.stockList}>
        {creatorStocks.map((stock) => {
          const gainLoss = (stock.currentPrice - stock.basePrice).toFixed(3);
          return (
            <ul key={stock.name}>
              <li>{stock.name}</li>
              <li>{stock.basePrice}</li>
              <li>{stock.currentPrice}</li>
              <li>{stock.quantity}</li>
              <li>{stock.stocksAllocated}</li>
              <li className={gainLoss >= 0 ? styles.gain : styles.loss}>{gainLoss}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default CreatorStocks;
