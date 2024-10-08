import React from "react";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
import styles from "./CreatorAllocatedStocks.module.css";
import Loader from "../../Pages/Loader/Loader";
import { useSelector } from "react-redux";
import ErrorPage from "../../Pages/ErrorPages/ErrorPage/ErrorPage";
function CreatorAllocatedStocks() {
  const creatorStocks = useSelector((state) => state.CreatorStocks.data);
  const creatorStocksStatus = useSelector(
    (state) => state.CreatorStocks.status
  );
  const creatorStocksError = useSelector((state) => state.CreatorStocks.error);
  const errorCode = useSelector((state) => state.CreatorStocks.errorCode);

  if (creatorStocksError) {
    return <ErrorPage errorCode={errorCode} errorMsg={creatorStocksError} />;
  }

  // if (creatorStocksStatus === "loading") {
  //   return <Loader />;
  // }

  return (
    <div>
      <div id={styles.CreatorStocksHeading}>
        <i class="fa-solid fa-arrow-trend-up"></i>
        {"   "}Your Allocated Stocks
      </div>
      <div id={styles.CreatorStocksContainer}>
        <CreatorStocks creatorStocks={creatorStocks || []} />
        <p>
          Click on the (+) icon to allocate more stocks but remember adding too
          many frequent stocks will result in degradation of it's value
        </p>
      </div>
    </div>
  );
}

export default CreatorAllocatedStocks;
