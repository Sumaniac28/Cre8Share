import React, { useState } from "react";
import styles from "./StockMarketplace.module.css";
import BuyStockModal from "../BuyStockModal/BuyStockModal";
import { useSelector } from "react-redux";
import Loader from "../../Pages/Loader/Loader";
import ServerError from "../../Pages/ErrorPages/ServerError/ServerError";

function StockMarketplace() {
  const [selectedStock, setSelectedStock] = useState(null);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
  };

  const closeModal = () => {
    setSelectedStock(null);
  };

  const allStocksData = useSelector((state) => state.StocksMarketPlace.data);
  const allStocksStatus = useSelector(
    (state) => state.StocksMarketPlace.status
  );
  const allStocksError = useSelector((state) => state.StocksMarketPlace.error);

  if (allStocksError) {
    return <ServerError />;
  }

  if (allStocksStatus === "loading") {
    return <Loader />;
  }

  const allStocks = allStocksData.data || [];

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
                  List Price :- <span>{stock.basePrice}</span>
                </li>
                <li>
                  P&L :- <span>{(stock.currentPrice - stock.basePrice).toFixed(3)}</span>
                </li>
                <li>
                  Units Available :- <span>{stock.stocksUnallocated}</span>
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
