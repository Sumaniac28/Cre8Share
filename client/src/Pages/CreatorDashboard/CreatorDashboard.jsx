import React, { useState } from "react";
import styles from "./CreatorDashboard.module.css";
import CreatorAnalytics from "../../Components/CreatorAnalytics/CreatorAnalytics";
import CreatorNavBar from "../../Components/CreatorNavBar/CreatorNavBar";
import CreatorSideBar from "../../Components/CreatorSidebar/CreatorSideBar";
import HelpSection from "../../Components/HelpSection/HelpSection";
import AddStockForm from "../../Components/AddStockForm/AddStockForm";
import CreatorAllocatedStocks from "../../Components/CreatorAllocatedStocks/CreatorAllocatedStocks";

function CreatorDashboard() {
  const [addStockModal, setAddStockModal] = useState(false);

  const [stockPage, setStockPage] = useState(false);

  const showStockPage = () => {
    setStockPage(true);
  };

  const hideStockPage = () => {
    setStockPage(false);
  };

  const showAddStockModal = () => {
    setAddStockModal(true);
  };

  const hideAddStockModal = () => {
    setAddStockModal(false);
  };
  return (
    <>
      <section
        className={`${styles.Container} ${addStockModal ? styles.blur : ""}`}
      >
        <CreatorNavBar />
        <div id={styles.AnalyticsContainer}>
          <CreatorSideBar
            showAddStockModal={showAddStockModal}
            showStockPage={showStockPage}
            hideStockPage={hideStockPage}
          />
          {stockPage ? <CreatorAllocatedStocks /> : <CreatorAnalytics />}
        </div>
        <HelpSection />
      </section>
      {addStockModal && <AddStockForm hideAddStockModal={hideAddStockModal} />}
    </>
  );
}

export default CreatorDashboard;
