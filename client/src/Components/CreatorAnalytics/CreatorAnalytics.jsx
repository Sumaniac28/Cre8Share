import React from "react";
import styles from "./CreatorAnalytics.module.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import StatsCard from "../StatsCard/StatsCard";
import StocksStatsCard from "../StockStatsCard/StocksStatsCard";
import EarningsCard from "../EarningsCard/EarningsCard";
import Top3Stocks from "../Top3Stocks/Top3Stocks";
import { useSelector } from "react-redux";
import Loader from "../../Pages/Loader/Loader";
import ErrorPage from "../../Pages/ErrorPages/ErrorPage/ErrorPage";
function CreatorAnalytics() {
  const creatorAnalytics = useSelector((state) => state.CreatorAnalytics.data);
  const creatorAnalyticsStatus = useSelector(
    (state) => state.CreatorAnalytics.status
  );
  const creatorAnalyticsError = useSelector(
    (state) => state.CreatorAnalytics.error
  );
  const creatorAnalyticsErrorCode = useSelector(
    (state) => state.CreatorAnalytics.errorCode
  );

  const creatorStocks = useSelector((state) => state.CreatorStocks.data);
  const creatorStocksStatus = useSelector(
    (state) => state.CreatorStocks.status
  );
  const creatorStocksError = useSelector((state) => state.CreatorStocks.error);
  const creatorStocksErrorCode = useSelector(
    (state) => state.CreatorStocks.errorCode
  );

  const hasError = creatorStocksError || creatorAnalyticsError;

  const errorCode = creatorAnalyticsErrorCode || creatorStocksErrorCode;

  const isLoading =
    creatorAnalyticsStatus === "loading" && creatorStocksStatus === "loading";

  if (hasError) {
    return <ErrorPage errorCode={errorCode} errorMsg={hasError} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const stats = creatorAnalytics.stats ? creatorAnalytics.stats[0] : {};
  const statsArray = creatorAnalytics.stats ? creatorAnalytics.stats : [];
  const earnings = creatorStocks[0]?.creator.earnings || 0;

  const calculateStockTotals = (stocks) => {
    return stocks.reduce(
      (totals, stock) => {
        totals.totalStocks += stock.quantity;
        totals.totalSold += stock.stocksAllocated;
        totals.totalUnsold += stock.stocksUnallocated;
        return totals;
      },
      { totalStocks: 0, totalSold: 0, totalUnsold: 0 }
    );
  };

  const stockTotals = calculateStockTotals(creatorStocks || []);

  return (
    <>
      <section className={styles.Container}>
        <div id={styles.StocksStatsCardContainer}>
          <StatsCard stats={stats} />
          <StocksStatsCard stockTotals={stockTotals} />
        </div>
        <div
          id={styles.AnalyticsGraphContainer}
          className={styles.AnalyticsCard}
        >
          <AnalyticsGraph valuation={stats.valuation} statsArray={statsArray} />
        </div>
        <div id={styles.EarningsContainer} className={styles.AnalyticsCard}>
          <EarningsCard earnings={earnings} />
        </div>

        <div className={styles.AnalyticsCard} id={styles.top3PerformingStocks}>
          <Top3Stocks creatorStocks={creatorStocks} />
        </div>
      </section>
    </>
  );
}

export default CreatorAnalytics;
