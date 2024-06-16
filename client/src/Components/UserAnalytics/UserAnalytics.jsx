import React from "react";
import styles from "./UserAnalytics.module.css";
import UserPortfolio from "../UserPortfolio/UserPortfolio";
const UserAnalytics = ({funds,totalInvested,totalGain,totalQuantity,totalValue}) => {
  return (
    <div id={styles.userStats}>
        <UserPortfolio funds={funds} totalInvested={totalInvested} totalGain={totalGain} totalQuantity={totalQuantity} totalValue={totalValue}/>
      <div className={styles.statsCard}>
        
      </div>
    </div>
  );
};

export default UserAnalytics;
