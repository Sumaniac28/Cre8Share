import React from "react";
import styles from "./UserStocks.module.css";
function UserStocks() {

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
        },
        {
            name:"Share 6",
            creatorName:"Creator 6",
            currentPrice:610,
            quantity:10,
            gainLoss:-10,
            className:styles.loss
        },
        {
            name:"Share 7",
            creatorName:"Creator 7",
            currentPrice:710,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        },
        {
            name:"Share 8",
            creatorName:"Creator 8",
            currentPrice:810,
            quantity:10,
            gainLoss:50,
            className:styles.gain
        },
        {
            name:"Share 9",
            creatorName:"Creator 9",
            currentPrice:910,
            quantity:10,
            gainLoss:-10,
            className:styles.loss
        },
        {
            name:"Share 10",
            creatorName:"Creator 10",
            currentPrice:1010,
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
        {userStocks.map((stock)=>{
            return(
                <ul>
                    <li>{stock.name}</li>
                    <li>{stock.creatorName}</li>
                    <li>{stock.currentPrice}</li>
                    <li>{stock.quantity}</li>
                    <li className={stock.className}>{stock.gainLoss}</li>
                    <li><button className={styles.sellButton}>Sell</button></li>
                </ul>
            )
        })}
      </div>
    </div>
  );
}

export default UserStocks;
