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
import ServerError from "../ErrorPages/ServerError/ServerError";
import Loader from "../Loader/Loader";
import socket from "../../socket";
import UserLogout from "../../Components/UserLogout/UserLogout";

function UserDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserStocks());
    dispatch(fetchAllStocks());

    socket.on("refreshUserStocks", () => {
      dispatch(fetchUserStocks());
    });

    socket.on("refreshCreatorStocks", () => {
      dispatch(fetchAllStocks());
    });

    return () => {
      socket.off("refresh");
    };
  }, [dispatch]);

  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);

  const userStocksStatus = useSelector((state) => state.UserStocks.status);

  const allStocksStatus = useSelector(
    (state) => state.StocksMarketPlace.status
  );

  const isLoading =
    userDataStatus === "loading" &&
    userStocksStatus === "loading" &&
    allStocksStatus === "loading";

  const hasError = userDataError;

  if (hasError) {
    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { name } = userData;

  return (
    <>
      <section className={styles.container}>
        <UserNavbar name={name} />
        <div id={styles.UserDashboardContainer}>
          <UserSidebar />
          <Routes>
            <Route path="/" element={<UserAnalytics />} />
            <Route path="stockmarketplace" element={<StockMarketplace />} />
            <Route path="userholdings" element={<UserHoldings />} />
            <Route path="logout" element={<UserLogout />}/>
          </Routes>
        </div>
        <HelpSection />
      </section>
    </>
  );
}

export default UserDashboard;
