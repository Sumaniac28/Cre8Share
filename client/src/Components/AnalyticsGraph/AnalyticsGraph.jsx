import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./AnalyticsGraph.module.css";

function AnalyticsGraph() {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Channel Analytics</p>
        <div className={styles.point} id={styles.AnalyticsPoint}></div>
      </div>
      <div className={styles.graphContainer}>
        <LineChart
          sx={{
            //change left yAxis label styles
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              strokeWidth: "1",
              fill: "#FFFFFF",
            },
            // change all labels fontFamily shown on both xAxis and yAxis
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              fontFamily: "Roboto",
            },
            // change bottom label styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              strokeWidth: "1",
              fill: "#FFFFFF",
            },
            // bottomAxis Line Styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "#ffb800",
              strokeWidth: 2,
            },
            // leftAxis Line Styles
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "#ffb800",
              strokeWidth: 2,
            },
          }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={250}
          width={600}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        />
      </div>
    </>
  );
}

export default AnalyticsGraph;
