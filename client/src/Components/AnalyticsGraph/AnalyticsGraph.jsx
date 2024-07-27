import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./AnalyticsGraph.module.css";

function AnalyticsGraph({ valuation, statsArray }) {
  const valuationArray = statsArray.map((stat) => stat.valuation);
  const dateArray = statsArray.map((stat) => {
    // Extract the day of the month from each date
    const date = new Date(stat.createdAt);
    return date.getDate().toString(); // Get day of the month as a string
  });

  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Channel Analytics</p>
        <div className={styles.point} id={styles.AnalyticsPoint}></div>
      </div>
      <div className={styles.graphContainer}>
        {statsArray.length > 1 ? (
          <LineChart
            sx={{
              // Change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                strokeWidth: "1",
                fill: "#FFFFFF",
              },
              // Change all labels fontFamily shown on both xAxis and yAxis
              "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                fontFamily: "Roboto",
              },
              // Change bottom label styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                strokeWidth: "1",
                fill: "#FFFFFF",
              },
              // BottomAxis Line Styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "#ffb800",
                strokeWidth: 2,
              },
              // LeftAxis Line Styles
              "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                stroke: "#ffb800",
                strokeWidth: 2,
              },
            }}
            xAxis={[{ data: dateArray, label: "Date" }]}
            series={[
              {
                data: valuationArray,
                label: "Valuation",
                color: "#ffb800",
              },
            ]}
            height={250}
            width={500}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          />
        ) : (
          <p id={styles.notEnoughData}>
            Not enough data to show the graph. Please wait for sometime to
            generate analytics ⚠️
          </p>
        )}
        <p>
          "Your channel's current valuation as per our internal algorithm is{" "}
          <span>${valuation}</span>. Channel analytics gets refreshed every
          Friday and is shown on the graph, which affects the price of all the
          stocks allocated to your channel."
        </p>
      </div>
    </>
  );
}

export default AnalyticsGraph;
