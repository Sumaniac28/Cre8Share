import React from "react";
import styles from "./StatsCard.module.css";

function StatsCard() {
  return (
    <>
      <div className={styles.AnalyticsCardTitle}>
        <p>Statstics</p>
        <div className={styles.point} id={styles.statsPoint}></div>
      </div>
      <ul id={styles.statistics}>
        <li>
          <i class="fa-solid fa-user"></i> <span>Subscribers</span>
          <span>100</span>
        </li>
        <li>
          <i class="fa-solid fa-thumbs-up"></i> <span>Likes</span>
          <span>100</span>
        </li>
        <li>
          <i class="fa-solid fa-thumbs-down"></i> <span>Dislikes</span>
          <span>100</span>
        </li>
        <li>
          <i class="fa-solid fa-play"></i> <span>Video Count</span>
          <span>100</span>
        </li>
      </ul>
    </>
  );
}

export default StatsCard;
