import React from "react";
import styles from "./UserAnalytics.module.css";
import UserPortfolio from "../UserPortfolio/UserPortfolio";
import { useSelector } from "react-redux";
import ServerError from "../../Pages/ErrorPages/ServerError/ServerError";
import Loader from "../../Pages/Loader/Loader";
const UserAnalytics = () => {
  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);

  const userStocksData = useSelector((state) => state.UserStocks.data);
  const userStocksStatus = useSelector((state) => state.UserStocks.status);
  const userStocksError = useSelector((state) => state.UserStocks.error);

  const funds = userData.funds || 0;

  const isLoading =
    userDataStatus === "loading" && userStocksStatus === "loading";
  const hasError = userDataError || userStocksError;

  if (hasError) {
    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const totalInvested = userStocksData.totalInvested || 0;
  const totalGain = userStocksData.totalGain || 0;
  const totalQuantity = userStocksData.totalQuantity || 0;
  const totalProfitLossPercentage =
    userStocksData.totalProfitLossPercentage || 0;
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
