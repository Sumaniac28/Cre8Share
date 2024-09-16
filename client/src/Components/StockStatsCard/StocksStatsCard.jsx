import React from "react";
import styles from "./StockStatsCard.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
function StocksStatsCard({ stockTotals }) {
  return (
    <section style={{ background: "#141417", padding: "20px" }}>
      <div className={styles.AnalyticsCardTitle}>
        <p>Stocks</p>
        <div className={styles.point} id={styles.stocksPoint}></div>
      </div>
      <div id={styles.StockStatsCardContainer}>
        <ul id={styles.stockStatistics}>
          <li>
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>Total Stocks</span>
            <span>{stockTotals.totalStocks}</span>
          </li>
          <li>
            <i class="fa-solid fa-check"></i> <span>Sold</span>
            <span>{stockTotals.totalSold}</span>
          </li>
          <li>
            <i class="fa-solid fa-xmark"></i> <span>Unsold</span>
            <span>{stockTotals.totalUnsold}</span>
          </li>
        </ul>
        <PieChart
          sx={{
            "& .MuiChartsLegend-column text": {
              fill: "white !important",
            },
          }}
          className={styles.pieChart}
          series={[
            {
              data: [
                { id: 1, value: stockTotals.totalSold, label: "Sold" },
                { id: 2, value: stockTotals.totalUnsold, label: "Unsold" },
              ],
            },
          ]}
          width={200}
          height={100}
        />
      </div>
    </section>
  );
}

export default StocksStatsCard;
