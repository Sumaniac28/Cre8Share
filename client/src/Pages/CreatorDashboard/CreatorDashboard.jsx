import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreatorDashboard.module.css";
import CreatorAnalytics from "../../Components/CreatorAnalytics/CreatorAnalytics";
import CreatorNavBar from "../../Components/CreatorNavBar/CreatorNavBar";
import CreatorSideBar from "../../Components/CreatorSidebar/CreatorSideBar";
import HelpSection from "../../Components/HelpSection/HelpSection";
import AddStockForm from "../../Components/AddStockForm/AddStockForm";
import CreatorAllocatedStocks from "../../Components/CreatorAllocatedStocks/CreatorAllocatedStocks";
import { fetchCreatorData } from "../../redux/reducers/creatorReducer";
import { fetchCreatorAnalytics } from "../../redux/reducers/creatorAnalyticsReducer";
import { fetchCreatorStocks } from "../../redux/reducers/creatorStocksReducer";
import Loader from "../../Pages/Loader/Loader";
import socket from "../../socket";
import CreatorLogout from "../../Components/CreatorLogout/CreatorLogout";
import { Drawer, useMediaQuery } from "@mui/material";
import ErrorPage from "../ErrorPages/ErrorPage/ErrorPage";

function CreatorDashboard() {
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCreatorData());
    dispatch(fetchCreatorAnalytics());
    dispatch(fetchCreatorStocks());

    socket.on("refreshCreatorStocks", () => {
      dispatch(fetchCreatorStocks());
    });

    socket.on("refreshCreatorAnalytics", () => {
      dispatch(fetchCreatorAnalytics());
    });

    return () => {
      socket.off("refreshCreatorStocks");
      socket.off("refreshCreatorAnalytics");
    };
  }, [dispatch]);

  const creatorData = useSelector((state) => state.Creator.data);
  const creatorDataStatus = useSelector((state) => state.Creator.status);
  const creatorDataError = useSelector((state) => state.Creator.error);
  const errorCode = useSelector((state) => state.Creator.errorCode);

  const isLoading = creatorDataStatus === "loading";

  if (creatorDataError) {
    return <ErrorPage errorCode={errorCode} errorMsg={creatorDataError} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { name, channelImage } = creatorData;

  return (
    <section className={styles.container}>
      <CreatorNavBar name={name} channelImage={channelImage} />
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

      <div id={styles.AnalyticsContainer}>
        {isSmallScreen ? (
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <div className={styles.drawerSahab}>
              <h2 id={styles.drawerTitle}>MENU</h2>
              <CreatorSideBar toggleDrawer={toggleDrawer} />
            </div>
          </Drawer>
        ) : (
          <CreatorSideBar toggleDrawer={toggleDrawer} />
        )}

        <Routes>
          <Route path="/" element={<CreatorAnalytics />} />
          <Route path="allocatedStocks" element={<CreatorAllocatedStocks />} />
          <Route path="allocateStocks" element={<AddStockForm />} />
          <Route path="/logout" element={<CreatorLogout />} />
        </Routes>
      </div>

      <HelpSection />
    </section>
  );
}
export default CreatorDashboard;
