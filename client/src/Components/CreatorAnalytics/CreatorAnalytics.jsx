import React from "react";
import styles from "./CreatorAnalytics.module.css";
import profilePic from "../../assets/images/unnamed.jpg";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
function CreatorAnalytics() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.CreatorAnalyticsContainer}>
          <div id={styles.creatorStats}>
            <div id={styles.aboutCreator}>
              <div>
                <p>Welcome</p>
                <p>
                  <span>Sumit Grover</span>
                </p>
              </div>
              <img src={profilePic} alt="Profilepic" />
            </div>
            <p>
              Stocks Allocated - 1000
              <br />
              <br />
              Stocks Sold - 500
              <br />
              <br />
              Stocks Remaining - 500{" "}
            </p>
            <div className={styles.Earnings}>
              <span>$10000</span>(T&C applied)
              <p>"Your Earnings"</p>
              <button>Withdraw</button>
            </div>
          </div>
          <div className={styles.channelStats}>
            <p id={styles.channelName}>
              Channel - <span>Channel Name </span>
            </p>
            <p>
              Your channel stats are shown below
              <br/>
               (it refreshes every friday)
            </p>
            <div className={styles.channelStatsList}>
              <li>Subscribers - 1000</li>
              <li>Video Count - 10</li>
            </div>
            <div className={styles.channelStatsList}>
              <li>Likes - 10000</li>
              <li>Dislikes - 5000</li>
            </div>
            <br/>
            <div className={styles.channelValuation}>
              <span>$40000</span>
              <p>"Channel's valutaion as per our algorithm"</p>
            </div>
          </div>
          <CreatorStocks />
        </div>
      </div>
    </>
  );
}

export default CreatorAnalytics;
