import React from "react";
import CreatorStocks from "../CreatorStocks/CreatorStocks";
import styles from "./CreatorAllocatedStocks.module.css";
function CreatorAllocatedStocks({creatorStocks}) {
  return (
    <div>
      <div id={styles.CreatorStocksHeading}>
        <i class="fa-solid fa-arrow-trend-up"></i>
        {"   "}Your Allocated Stocks
      </div>
      <div id={styles.CreatorStocksContainer}>
        <CreatorStocks creatorStocks={creatorStocks} />
        <p>
          Click on the (+) icon to allocate more stocks but remember adding too
          many frequent stocks will result in degradation of it's value
        </p>
      </div>
    </div>
  );
}

export default CreatorAllocatedStocks;
