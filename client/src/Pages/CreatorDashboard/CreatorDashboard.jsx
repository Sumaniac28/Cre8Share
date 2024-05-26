import React from 'react';
import { Routes, Route} from 'react-router-dom';
import styles from './CreatorDashboard.module.css';
import CreatorAnalytics from '../../Components/CreatorAnalytics/CreatorAnalytics';
import CreatorNavBar from '../../Components/CreatorNavBar/CreatorNavBar';
import CreatorSideBar from '../../Components/CreatorSidebar/CreatorSideBar';
import HelpSection from '../../Components/HelpSection/HelpSection';
import AddStockForm from '../../Components/AddStockForm/AddStockForm';
import CreatorAllocatedStocks from '../../Components/CreatorAllocatedStocks/CreatorAllocatedStocks';

function CreatorDashboard() {
  return (
    <>
      <section className={styles.container}>
        <CreatorNavBar />
        <div id={styles.AnalyticsContainer}>
          <CreatorSideBar
          />
          <Routes>
            <Route path="/" element={<CreatorAnalytics />} />
            <Route path="allocatedStocks" element={<CreatorAllocatedStocks />} />
            <Route path="allocateStocks" element={<AddStockForm/>}/>
          </Routes>
        </div>
        <HelpSection />
      </section>
    </>
  );
}

export default CreatorDashboard;
