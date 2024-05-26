import React from "react";
import styles from "./UserHoldings.module.css";
import UserStocks from "../UserStocks/UserStocks";
function UserHoldings() {
  return (
    <div id={styles.StockMarketplaceContainer}>
      <div id={styles.StockMarketplaceTitle}>
        <p id={styles.Appname}>CURRENT HOLDINGS</p>
        <div id={styles.search}>
          <input type="text" placeholder="Search" />
          <i class="fa-solid fa-search"></i>
        </div>
      </div>
      <UserStocks/>
    </div>
  );
}

export default UserHoldings;
