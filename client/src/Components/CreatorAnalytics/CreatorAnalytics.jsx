import React from "react";
import styles from "./CreatorAnalytics.module.css";
import CreatorTopBar from "../CreatorTopBar/CreatorTopBar";
import StatsCard from "../StatsCard/StatsCard";
import StocksStatsCard from "../StockStatsCard/StocksStatsCard";
import ValuationCard from "../ValuationCard/ValuationCard";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import EarningsCard from "../EarningsCard/EarningsCard";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
function CreatorAnalytics() {
  return (
    <>
      <div className={styles.container}>
        <CreatorTopBar />
        <div className={styles.CreatorAnalyticsContainer}>
          <div className={styles.AnalyticsRow}>
            <div className={styles.AnalyticsCard}>
              <StatsCard />
            </div>
            <div className={styles.AnalyticsCard}>
              <StocksStatsCard />
            </div>
            <div className={styles.AnalyticsCard}>
              <ValuationCard />
            </div>
          </div>
          <div className={styles.AnalyticsRow}>
            <div className={styles.AnalyticsCard}>
              <EarningsCard />
            </div>
            <div className={styles.AnalyticsCard}>
              <AnalyticsGraph />
            </div>
          </div>
          <CreatorStocks />
        </div>
        <div id={styles.helpSection}>
          Need any further help?{" "}
          <span>
            <a href="/">Contact us</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default CreatorAnalytics;
