import React from "react";
import styles from "./StockMarketplace.module.css";
function StockMarketplace({ allStocks }) {
  return (
    <>
      <div id={styles.StockMarketplaceContainer}>
        <div id={styles.StockMarketplaceTitle}>
          <p id={styles.Appname}>CRE8SHARE MARKETPLACE</p>
          <div id={styles.search}>
            <input type="text" placeholder="Search" />
            <i class="fa-solid fa-search"></i>
          </div>
        </div>
        <div id={styles.StockMarketplaceContent}>
          {allStocks.map((stock, index) => {
            return (
              <div id={styles.StockMarketplaceCard} key={index}>
                <h4>{stock.name}</h4>
                <p>{stock.creator.name}</p>
                <ul>
                  <li>Current Price :- <span>{stock.currentPrice.toFixed(3)}</span></li>
                  <li>List Price :- <span>{stock.listPrice.toFixed(3)}</span></li>
                  <li>P&L :- <span>{(stock.currentPrice - stock.listPrice).toFixed(3)}</span></li>
                  <li>Units Available :- <span>{stock.unsold}</span></li>
                </ul>
                <button>Buy</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StockMarketplace;
