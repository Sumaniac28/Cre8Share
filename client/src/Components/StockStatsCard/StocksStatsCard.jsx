import React from "react";
import styles from "./StockStatsCard.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
function StocksStatsCard() {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Stocks</p>
        <div className={styles.point} id={styles.stocksPoint}></div>
      </div>
      <div id={styles.StockStatsCardContainer}>
        <ul id={styles.stockStatistics}>
          <li>
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>Total Stocks</span>
            <span>100</span>
          </li>
          <li>
            <i class="fa-solid fa-check"></i> <span>Sold</span>
            <span>20</span>
          </li>
          <li>
            <i class="fa-solid fa-xmark"></i> <span>Unsold</span>
            <span>80</span>
          </li>
        </ul>
        <PieChart
        sx={{
          "& .MuiChartsLegend-column text":{
            fill: "white !important",
          }
        }}
          className={styles.pieChart}
          series={[
            {
              data: [
                { id: 1, value: 20, label: "Sold" },
                { id: 2, value: 80, label: "Unsold" },
              ],
            },
          ]}
          width={200}
          height={100}
        />
      </div>
    </>
  );
}

export default StocksStatsCard;