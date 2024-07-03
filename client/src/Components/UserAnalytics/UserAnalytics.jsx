import React from "react";
import styles from "./UserAnalytics.module.css";
import UserPortfolio from "../UserPortfolio/UserPortfolio";
const UserAnalytics = ({ funds, totalInvested, totalGain, totalQuantity,totalProfitLossPercentage }) => {
  return (
    <div id={styles.userStats}>
      <UserPortfolio
        funds={funds}
        totalInvested={totalInvested}
        totalGain={totalGain}
        totalQuantity={totalQuantity}
        totalProfitLossPercentage={totalProfitLossPercentage}
      />
      <div className={styles.statsCard}></div>
    </div>
  );
};

export default UserAnalytics;
