import React, { useEffect } from "react";
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
import ServerError from "../ErrorPages/ServerError/ServerError";
import socket from "../../socket";
import CreatorLogout from "../../Components/CreatorLogout/CreatorLogout";

function CreatorDashboard() {
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

  const isLoading = creatorDataStatus === "loading";
  const hasError = creatorDataError;

  if (hasError) {
    console.log(hasError);

    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { name, channelImage } = creatorData;

  return (
    <section className={styles.container}>
      <CreatorNavBar name={name} channelImage={channelImage} />
      <div id={styles.AnalyticsContainer}>
        <CreatorSideBar />
        <Routes>
          <Route path="/" element={<CreatorAnalytics />} />
          <Route path="allocatedStocks" element={<CreatorAllocatedStocks />} />
          <Route path="allocateStocks" element={<AddStockForm />} />
          <Route path="/logout" element={<CreatorLogout/>}/>
        </Routes>
      </div>
      <HelpSection />
    </section>
  );
}
export default CreatorDashboard;
