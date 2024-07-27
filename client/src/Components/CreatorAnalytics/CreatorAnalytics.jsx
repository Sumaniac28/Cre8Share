import React from "react";
import styles from "./CreatorAnalytics.module.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import StatsCard from "../StatsCard/StatsCard";
import StocksStatsCard from "../StockStatsCard/StocksStatsCard";
import EarningsCard from "../EarningsCard/EarningsCard";
import Top3Stocks from "../Top3Stocks/Top3Stocks";
function CreatorAnalytics({ creatorAnalytics, earnings, creatorStocks }) {
  const stats = creatorAnalytics.stats?creatorAnalytics.stats[0]:{};
  const statsArray = creatorAnalytics.stats?creatorAnalytics.stats:[];

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

  const stockTotals = calculateStockTotals(creatorStocks);

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
          <AnalyticsGraph valuation={stats.valuation} statsArray={statsArray}  />
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
