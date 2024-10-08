import React from "react";
import styles from "./UserAnalytics.module.css";
import UserPortfolio from "../UserPortfolio/UserPortfolio";
import { useSelector } from "react-redux";
import Loader from "../../Pages/Loader/Loader";
import ErrorPage from "../../Pages/ErrorPages/ErrorPage/ErrorPage";
const UserAnalytics = () => {
  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);
  const userErrorCode = useSelector((state) => state.user.errorCode);

  const userStocksData = useSelector((state) => state.UserStocks.data);
  const userStocksStatus = useSelector((state) => state.UserStocks.status);
  const userStocksError = useSelector((state) => state.UserStocks.error);
  const stocksErrorCode = useSelector((state) => state.UserStocks.errorCode);

  let funds = userData.funds || 0;
  funds = funds.toFixed(3);

  const errorCode = userErrorCode || stocksErrorCode;

  const isLoading =
    userDataStatus === "loading" && userStocksStatus === "loading";
  const hasError = userDataError || userStocksError;

  if (hasError) {
    return <ErrorPage errorCode={errorCode} errorMsg={hasError} />;
  }

  // if (isLoading) {
  //   return <Loader />;
  // }

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
