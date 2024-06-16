import React from "react";
import styles from "./CreatorStocks.module.css";

function CreatorStocks({ creatorStocks }) {

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

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
          const gainLoss = stock.currentPrice - stock.listPrice;
          return (
            <ul key={stock.name}>
              <li>{stock.name}</li>
              <li>{formatPrice(stock.listPrice)}</li>
              <li>{formatPrice(stock.currentPrice)}</li>
              <li>{stock.quantity}</li>
              <li>{stock.sold}</li>
              <li className={gainLoss >= 0 ? styles.gain : styles.loss}>{formatPrice(gainLoss)}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default CreatorStocks;
