import React, {useState} from 'react'
import styles from './CreatorDashboard.module.css';
import CreatorSideBar from '../../Components/CreatorSidebar/CreatorSideBar';
import CreatorAnalytics from '../../Components/CreatorAnalytics/CreatorAnalytics';
import AddStockForm from '../../Components/AddStockForm/AddStockForm';
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
     <section className={`${styles.Container} ${addStockModal ? styles.blur : ""}`}>
        <CreatorSideBar showAddStockModal={showAddStockModal} showStockPage={showStockPage} hideStockPage={hideStockPage} />
        <CreatorAnalytics stockPage={stockPage} />
    </section>
    {addStockModal && (<AddStockForm hideAddStockModal={hideAddStockModal}/>)}
   </>
  )
}

export default CreatorDashboard