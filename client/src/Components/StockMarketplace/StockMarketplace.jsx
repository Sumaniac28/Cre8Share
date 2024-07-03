import React, { useState } from "react";
import styles from "./StockMarketplace.module.css";
import BuyStockModal from "../BuyStockModal/BuyStockModal";

function StockMarketplace({ allStocks }) {
  const [selectedStock, setSelectedStock] = useState(null);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
  };

  const closeModal = () => {
    setSelectedStock(null);
  };

  return (
    <>
      <div
        id={styles.StockMarketplaceContainer}
        className={selectedStock && styles.blur}
      >
        <div id={styles.StockMarketplaceTitle}>
          <p id={styles.Appname}>CRE8SHARE MARKETPLACE</p>
          <div id={styles.search}>
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-search"></i>
          </div>
        </div>
        <div id={styles.StockMarketplaceContent}>
          {allStocks.map((stock, index) => (
            <div id={styles.StockMarketplaceCard} key={index}>
              <h4>{stock.name}</h4>
              <p>{stock.creator.name}</p>
              <ul>
                <li>
                  Current Price :- <span>{stock.currentPrice}</span>
                </li>
                <li>
                  List Price :- <span>{stock.listPrice}</span>
                </li>
                <li>
                  P&L :- <span>{stock.currentPrice - stock.listPrice}</span>
                </li>
                <li>
                  Units Available :- <span>{stock.unsold}</span>
                </li>
              </ul>
              <button onClick={() => handleBuyClick(stock)}>Buy</button>
            </div>
          ))}
        </div>
      </div>
      {selectedStock && (
        <BuyStockModal stock={selectedStock} onClose={closeModal} />
      )}
    </>
  );
}

export default StockMarketplace;
