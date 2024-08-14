import React from "react";
import styles from "./UserHoldings.module.css";
import UserStocks from "../UserStocks/UserStocks";
import { useSelector } from "react-redux";
import Loader from "../../Pages/Loader/Loader";
import ServerError from "../../Pages/ErrorPages/ServerError/ServerError";
function UserHoldings() {
  const userStocksData = useSelector((state) => state.UserStocks.data);
  const userStocksStatus = useSelector((state) => state.UserStocks.status);
  const userStocksError = useSelector((state) => state.UserStocks.error);

  if (userStocksStatus === "loading") {
    return <Loader />;
  }

  if (userStocksError) {
    return <ServerError />;
  }

  const stocks = userStocksData.stocks || [];

  return (
    <div id={styles.StockMarketplaceContainer}>
      <div id={styles.StockMarketplaceTitle}>
        <p id={styles.Appname}>CURRENT HOLDINGS</p>
        <div id={styles.search}>
          <input type="text" placeholder="Search" />
          <i class="fa-solid fa-search"></i>
        </div>
      </div>
      <UserStocks stocks={stocks} />
    </div>
  );
}

export default UserHoldings;
