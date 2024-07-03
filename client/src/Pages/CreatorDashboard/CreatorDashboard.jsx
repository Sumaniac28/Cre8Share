import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import ServerError from "../ServerError/ServerError";
import socket from "../../socket";

function CreatorDashboard() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

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
    }
    
  }, [dispatch, location.search]);

  const creatorData = useSelector((state) => state.Creator.data);
  const creatorDataStatus = useSelector((state) => state.Creator.status);
  const creatorDataError = useSelector((state) => state.Creator.error);

  const creatorAnalytics = useSelector((state) => state.CreatorAnalytics.data);
  const creatorAnalyticsStatus = useSelector(
    (state) => state.CreatorAnalytics.status
  );
  const creatorAnalyticsError = useSelector(
    (state) => state.CreatorAnalytics.error
  );

  const creatorStocks = useSelector((state) => state.CreatorStocks.data);
  const creatorStocksStatus = useSelector(
    (state) => state.CreatorStocks.status
  );
  const creatorStocksError = useSelector((state) => state.CreatorStocks.error);

  const isLoading =
    creatorDataStatus === "loading" &&
    creatorAnalyticsStatus === "loading" &&
    creatorStocksStatus === "loading";

  const hasError =
    creatorDataStatus === "rejected" ||
    creatorAnalyticsStatus === "rejected" ||
    creatorStocksStatus === "rejected";

  if (hasError) {
    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { name, channelImage, earnings } = creatorData;

    return (
      <section className={styles.container}>
        <CreatorNavBar name={name} channelImage={channelImage} />
        <div id={styles.AnalyticsContainer}>
          <CreatorSideBar />
          <Routes>
            <Route
              path="/"
              element={
                <CreatorAnalytics
                  creatorAnalytics={creatorAnalytics}
                  earnings={earnings}
                  creatorStocks={creatorStocks}
                />
              }
            />
            <Route
              path="allocatedStocks"
              element={<CreatorAllocatedStocks creatorStocks={creatorStocks} />}
            />
            <Route path="allocateStocks" element={<AddStockForm />} />
          </Routes>
        </div>
        <HelpSection />
      </section>
    );
  }
export default CreatorDashboard;
