import React from "react";
import styles from "./CreatorSideBar.module.css";
function CreatorSideBar({ showAddStockModal, showStockPage, hideStockPage }) {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.SidebarContainer}>
          <span>
            <i class="fa-solid fa-chart-line" onClick={hideStockPage}></i>
            <a href="/">Dashboard</a>
          </span>
          <span>
            <i class="fa-solid fa-plus" onClick={showAddStockModal}></i>
            <a href="/">Allocate Stocks</a>
          </span>
          <span>
            <i class="fa-solid fa-arrow-trend-up" onClick={showStockPage}></i>
            <a href="/">Your Stocks</a>
          </span>
          <span>
            <i class="fa-solid fa-book"></i>
            <a href="/">Education</a>
          </span>
          <span>
            <i class="fa-solid fa-phone"></i>
            <a href="/">Contact Us</a>
          </span>
          <span id={styles.signOut}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <a href="/">Sign Out</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default CreatorSideBar;
