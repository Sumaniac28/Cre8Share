import React, { useEffect, useState } from "react";
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
import Loader from "../Loader/Loader";
import socket from "../../socket";
import UserLogout from "../../Components/UserLogout/UserLogout";
import { Drawer, useMediaQuery } from "@mui/material";
import ErrorPage from "../ErrorPages/ErrorPage/ErrorPage";

function UserDashboard() {
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
  const errorCode = useSelector((state) => state.user.errorCode);

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
    return <ErrorPage errorCode={errorCode} errorMsg={userDataError} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { name } = userData;

  return (
    <>
      <section className={styles.container}>
        <UserNavbar name={name} />
        {isSmallScreen && (
          <div
            className={`${styles.trapezoidButton} ${
              open ? styles.moveRight : ""
            }`}
            onClick={toggleDrawer(!open)}
          >
            {open ? "←" : "→"}
          </div>
        )}

        <div id={styles.UserDashboardContainer}>
          {isSmallScreen ? (
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
              <div className={styles.drawerSahab}>
                <h2 id={styles.drawerTitle}>MENU</h2>
                <UserSidebar toggleDrawer={toggleDrawer} />
              </div>
            </Drawer>
          ) : (
            <UserSidebar toggleDrawer={toggleDrawer} />
          )}
          <Routes>
            <Route path="/" element={<UserAnalytics />} />
            <Route path="stockmarketplace" element={<StockMarketplace />} />
            <Route path="userholdings" element={<UserHoldings />} />
            <Route path="logout" element={<UserLogout />} />
          </Routes>
        </div>
        <HelpSection />
      </section>
    </>
  );
}

export default UserDashboard;
