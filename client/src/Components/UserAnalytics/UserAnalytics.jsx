import React from "react";
import styles from "./UserAnalytics.module.css";
import UserPortfolio from "../UserPortfolio/UserPortfolio";
const UserAnalytics = () => {
  return (
    <div id={styles.userStats}>
        <UserPortfolio/>
      <div className={styles.statsCard}>
        
      </div>
    </div>
  );
};

export default UserAnalytics;
