import React from "react";
import styles from "./UserStocks.module.css";
function UserStocks({stocks}) {

    const userStocks=[
        {
            name:"Share 1",
            creatorName:"Creator 1",
            currentPrice:110,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        },
        {
            name:"Share 2",
            creatorName:"Creator 2",
            currentPrice:210,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        },
        {
            name:"Share 3",
            creatorName:"Creator 3",
            currentPrice:310,
            quantity:10,
            gainLoss:-10,
            className:styles.loss
        },
        {
            name:"Share 4",
            creatorName:"Creator 4",
            currentPrice:410,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        },
        {
            name:"Share 5",
            creatorName:"Creator 5",
            currentPrice:510,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        }
    ]
  return (
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
        {/* <ul>
          <li>Share 1</li>
          <li>Creator 1</li>
          <li>110</li>
          <li>10</li>
          <li className={styles.gain}>50</li>
          <li><button className={styles.sellButton}>Sell</button></li>
        </ul> */}
        {stocks.map((stock)=>{
            return(
                <ul>
                    <li>{stock.stock.name}</li>
                    <li>{stock.creatorName}</li>
                    <li>{stock.stock.currentPrice.toFixed(3)}</li>
                    <li>{stock.stock.quantity}</li>
                    <li className={stock.className}>{(stock.stock.currentPrice-stock.stock.listPrice).toFixed(3)}</li>
                    <li><button className={styles.sellButton}>Sell</button></li>
                </ul>
            )
        })}
      </div>
    </div>
  );
}

export default UserStocks;
