import React from "react";
import styles from "./StatsCard.module.css";

function StatsCard({stats}) {
  return (
    <section style={{ background: "#141417", padding: "20px" }}>
      <div className={styles.AnalyticsCardTitle}>
        <p>Statstics</p>
        <div className={styles.point} id={styles.statsPoint}></div>
      </div>
      <ul id={styles.statistics}>
        <li>
          <i class="fa-solid fa-user"></i> <span>Subscribers</span>
          <span>{stats.subscribers}</span>
        </li>
        <li>
          <i class="fa-solid fa-thumbs-up"></i> <span>Likes</span>
          <span>{stats.likes}</span>
        </li>
        <li>
          <i class="fa-solid fa-thumbs-down"></i> <span>Dislikes</span>
          <span>{stats.dislikes}</span>
        </li>
        <li>
          <i class="fa-solid fa-play"></i> <span>Video Count</span>
          <span>{stats.videoCount}</span>
        </li>
      </ul>
    </section>
  );
}

export default StatsCard;
