import React from "react";
import styles from "./StockMarketplace.module.css";
function StockMarketplace() {

  const StockList =[
    {
      name: "Share1",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share2",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share3",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share4",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share5",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share6",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share7",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share8",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share9",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    },
    {
      name: "Share10",
      creator: "Creator Name",
      currentPrice: "Current Price",
      listPrice: "List Price",
      priceChange: "Price Change",
      sharesAvailable: "Shares Available"
    }

  ]
  return (
    <>
      <div id={styles.StockMarketplaceContainer}>
        <div id={styles.StockMarketplaceTitle}>
          <p id={styles.Appname}>CRE8SHARE MARKETPLACE</p>
          <div id={styles.search}>
            <input type="text" placeholder="Search" />
            <i class="fa-solid fa-search"></i>
          </div>
        </div>
        <div id={styles.StockMarketplaceContent}>
        {/* <div id={styles.StockMarketplaceCard}>
              <h4>Share1</h4>
              <p>Creator Name</p>
              <ul>
                <li>Current Price</li>
                <li>List Price</li>
                <li>Price Change</li>
                <li>Shares Available</li>
              </ul>
              <button>Buy</button>
            </div> */}

          {StockList.map((stock, index) => {
            return (
              <div id={styles.StockMarketplaceCard} key={index}>
                <h4>{stock.name}</h4>
                <p>{stock.creator}</p>
                <ul>
                  <li>{stock.currentPrice}</li>
                  <li>{stock.listPrice}</li>
                  <li>{stock.priceChange}</li>
                  <li>{stock.sharesAvailable}</li>
                </ul>
                <button>Buy</button>
              </div>
            );
          })}
          </div>
      </div>
    </>
  );
}

export default StockMarketplace;
