import React,{useState} from "react";
import styles from "./UserStocks.module.css";
import SellStockModal from "../SellStockModal/SellStockModal";
function UserStocks({ stocks }) {

  const [selectedStock, setSelectedStock] = useState(null);

  const handleSellClick = (stock) => {
    console.log(stock);
    setSelectedStock(stock);

  };

  const closeModal = () => {
    setSelectedStock(null);
  };

  return (
    <>
      <div id={styles.UserStocksContainer}>
        <div id={styles.stockListHeading}>
          <li>Name</li>
          <li>Creator Name</li>
          <li>Current Price</li>
          <li>Quantity</li>
          <li>Gain/Loss</li>
          <li>Sell</li>
        </div>
        <div id={styles.stockList}>
          {stocks.map((stock) => {
            return (
              <ul>
                <li>{stock.stock.name}</li>
                <li>{stock.creatorName}</li>
                <li>{stock.stock.currentPrice.toFixed(3)}</li>
                <li>{stock.totalQuantityPerStock}</li>
                <li className={stock.className}>
                  {(stock.stock.currentPrice - stock.stock.listPrice).toFixed(
                    3
                  )}
                </li>
                <li>
                  <button className={styles.sellButton} onClick={() => handleSellClick(stock)}>Sell</button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      {selectedStock && (
        <SellStockModal
          stock={selectedStock}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default UserStocks;
