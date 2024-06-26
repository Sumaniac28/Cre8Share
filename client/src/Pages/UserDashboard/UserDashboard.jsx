import React, { useEffect } from "react";
import styles from "./UserDashboard.module.css";
import UserNavbar from "../../Components/UserNavbar/UserNavbar";
import UserSidebar from "../../Components/UserSidebar/UserSidebar";
import UserAnalytics from "../../Components/UserAnalytics/UserAnalytics";
import HelpSection from "../../Components/HelpSection/HelpSection";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/reducers/userReducer";
import { fetchUserStocks } from "../../redux/reducers/userStocksReducer";
import { fetchAllStocks } from "../../redux/reducers/stocksMarketPlaceReducer";
import StockMarketplace from "../../Components/StockMarketplace/StockMarketplace";
import UserHoldings from "../../Components/UserHoldings/UserHoldings";
import ServerError from "../ServerError/ServerError";
import Loader from "../Loader/Loader";

function UserDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserStocks());
    dispatch(fetchAllStocks());
  }, [dispatch]);

  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);

  const userStocksData = useSelector((state) => state.UserStocks.data);
  const userStocksStatus = useSelector((state) => state.UserStocks.status);
  const userStocksError = useSelector((state) => state.UserStocks.error);

  const allStocksData = useSelector((state) => state.StocksMarketPlace.data);
  const allStocksStatus = useSelector(
    (state) => state.StocksMarketPlace.status
  );
  const allStocksError = useSelector((state) => state.StocksMarketPlace.error);

  const isLoading =
    userDataStatus === "loading" ||
    userStocksStatus === "loading" ||
    allStocksStatus === "loading";

  const hasError =
    userDataStatus === "rejected" ||
    userStocksStatus === "rejected" ||
    allStocksStatus === "rejected";

  if (hasError) {
    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(userData, userStocksData, allStocksData);

  const { name, funds } = userData;

  if (
    userDataStatus === "fulfilled" &&
    userStocksStatus === "fulfilled" &&
    allStocksStatus === "fulfilled"
  ) {
    return (
      <>
        <section className={styles.container}>
          <UserNavbar name={name} />
          <div id={styles.UserDashboardContainer}>
            <UserSidebar />
            <Routes>
              <Route path="/" element={<UserAnalytics funds={funds} totalInvested={userStocksData.totalInvested} totalGain={userStocksData.totalGain} totalQuantity= {userStocksData.totalQuantity} totalValue={userStocksData.totalValue} />} />
              <Route
                path="stockmarketplace"
                element={<StockMarketplace allStocks={allStocksData.data} />}
              />
              <Route path="userholdings" element={<UserHoldings stocks={userStocksData.stocks} />} />
            </Routes>
          </div>
          <HelpSection />
        </section>
      </>
    );
  }
}

export default UserDashboard;
