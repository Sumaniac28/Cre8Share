import React from "react";
import styles from "./CreatorStocks.module.css";

function CreatorStocks() {
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
        <ul>
          <li>Share 1</li>
          <li>100</li>
          <li>110</li>
          <li>10</li>
          <li>50</li>
          <li className={styles.gain}>10</li>
        </ul>
        <ul>
          <li>Share 2</li>
          <li>200</li>
          <li>210</li>
          <li>10</li>
          <li>50</li>
          <li className={styles.gain}>10</li>
        </ul>
        <ul>
          <li>Share 3</li>
          <li>300</li>
          <li>310</li>
          <li>10</li>
          <li>50</li>
          <li className={styles.loss}>-10</li>
        </ul>
      </div>
    </>
  );
}

export default CreatorStocks;
