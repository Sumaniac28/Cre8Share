import React from "react";
import styles from "./UserPortfolio.module.css";

function UserPortfolio({funds,totalInvested,totalGain,totalQuantity,totalValue}) {
  const upperPortfolioItems = [
    {
      name: "Invested",
      id: styles.investedPoint,
      value: totalInvested
    },
    {
      name: "Current Value",
      id: styles.currentValuePoint,
      value: (totalInvested+totalGain).toFixed(3)
    },
    {
      name: "Total Quantity",
      id: styles.totalQuantityPoint,
      value: totalQuantity
    },
    {
      name: "Dividends",
      id: styles.dividendsPoint,
      value: "$100",
    },
    {
      name: "Profit/Loss",
      id: styles.profitLossPoint,
      value: totalGain.toFixed(3)
    },
  ];

  const totalGainLossPercentage = (totalGain / totalInvested) * 100;
  return (
    <div id={styles.portfolioNumbers}>
      <div id={styles.portfolioUpperNumbers}>
        {upperPortfolioItems.map((item, index) => {
          return (
            <div className={styles.statsCard}>
              <div className={styles.cardTitle}>
                <p>{item.name}</p>
                <div className={styles.point} id={item.id}></div>
              </div>
              <div className={styles.cardValue}>
                <p>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div id={styles.portfolioLowerNumbers}>
        <div className={styles.statsCard}>
          <div className={styles.cardTitle}>
            <p>Profit/Loss</p>
            <div className={styles.point} id={styles.profitLossPoint}></div>
          </div>
          <div id={styles.profitLossValue}>
            <p>{totalGain.toFixed(3)}</p>
            <span id={styles.profitPercentage}>({totalGainLossPercentage}%)</span>
          </div>
          <p>
            (This value gets updated in real time, when the price of your owned
            stock gets affected)
          </p>
        </div>
        <div className={styles.statsCard}>
          <div className={styles.cardTitle}>
            <p>Funds</p>
            <div className={styles.point} id={styles.fundsPoint}></div>
          </div>
          <div id={styles.fundsValue}>
            <h2>{funds} coins</h2>
            <p>
              (These are Cre8Share funds, you can cash out them for real cash in
              your connected bank accounts)
            </p>
          </div>
          <div id={styles.cashBtn}>
            <button>Add Funds</button>
            <button>Withdraw Funds</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPortfolio;
