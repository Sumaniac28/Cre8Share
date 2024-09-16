import React from "react";
import styles from "./CreatorAnalytics.module.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import StatsCard from "../StatsCard/StatsCard";
import StocksStatsCard from "../StockStatsCard/StocksStatsCard";
import EarningsCard from "../EarningsCard/EarningsCard";
import Top3Stocks from "../Top3Stocks/Top3Stocks";
import { useSelector } from "react-redux";
import Loader from "../../Pages/Loader/Loader";
import ServerError from "../../Pages/ErrorPages/ServerError/ServerError";
function CreatorAnalytics() {
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

  const hasError =
    creatorDataError || creatorStocksError || creatorAnalyticsError;

  const isLoading =
    creatorDataStatus === "loading" &&
    creatorAnalyticsStatus === "loading" &&
    creatorStocksStatus === "loading";

  if (hasError) {
    const errorCode =
      creatorDataError?.code ||
      creatorAnalyticsError?.code ||
      creatorStocksError?.code;
    const errorMessage =
      creatorDataError?.message ||
      creatorAnalyticsError?.message ||
      creatorStocksError?.message;
    return <ServerError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const stats = creatorAnalytics.stats ? creatorAnalytics.stats[0] : {};
  const statsArray = creatorAnalytics.stats ? creatorAnalytics.stats : [];
  const earnings = creatorData.earnings || 0;

  const calculateStockTotals = (stocks) => {
    return stocks.reduce(
      (totals, stock) => {
        totals.totalStocks += stock.quantity;
        totals.totalSold += stock.sold;
        totals.totalUnsold += stock.quantity - stock.sold;
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
