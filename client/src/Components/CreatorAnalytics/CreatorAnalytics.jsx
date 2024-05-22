import React from "react";
import styles from "./CreatorAnalytics.module.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import StatsCard from "../StatsCard/StatsCard";
import StocksStatsCard from "../StockStatsCard/StocksStatsCard";
import EarningsCard from "../EarningsCard/EarningsCard";
import Top3Stocks from "../Top3Stocks/Top3Stocks";
function CreatorAnalytics({ stockPage }) {
  return (
    <>
      <section className={styles.Container}>
        <div id={styles.StocksStatsCardContainer}>
          <StatsCard />
          <StocksStatsCard />
        </div>
        <div
          id={styles.AnalyticsGraphContainer}
          className={styles.AnalyticsCard}
        >
          <AnalyticsGraph />
        </div>
        <div id={styles.EarningsContainer} className={styles.AnalyticsCard}>
          <EarningsCard />
        </div>

        <div className={styles.AnalyticsCard} id={styles.top3PerformingStocks}>
          <Top3Stocks />
        </div>
      </section>
    </>
  );
}

export default CreatorAnalytics;
