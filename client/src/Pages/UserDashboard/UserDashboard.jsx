import React from "react";
import styles from "./UserDashboard.module.css";
import UserNavbar from "../../Components/UserNavbar/UserNavbar";
import UserSidebar from "../../Components/UserSidebar/UserSidebar";
import UserAnalytics from "../../Components/UserAnalytics/UserAnalytics";
import HelpSection from "../../Components/HelpSection/HelpSection";
import { Route, Routes } from "react-router-dom";
import StockMarketplace from "../../Components/StockMarketplace/StockMarketplace";
import UserHoldings from "../../Components/UserHoldings/UserHoldings";

function UserDashboard() {
  return (
    <>
      <section className={styles.container}>
        <UserNavbar />
        <div id={styles.UserDashboardContainer}>
          <UserSidebar/>
          <Routes>
            <Route path="/" element={<UserAnalytics/>} />
            <Route path="stockmarketplace" element={<StockMarketplace/>} />
            <Route path="userholdings" element={<UserHoldings/>} />
          </Routes>
        </div>
        <HelpSection/>
      </section>
    </>
  );
}

export default UserDashboard;
