import React from 'react'
import styles from './CreatorDashboard.module.css';
import CreatorSideBar from '../../Components/CreatorSidebar/CreatorSideBar';
import CreatorAnalytics from '../../Components/CreatorAnalytics/CreatorAnalytics';
function CreatorDashboard() {
  return (
    <section className={styles.Container}>
        <CreatorSideBar/>
        <CreatorAnalytics/>
    </section>
  )
}

export default CreatorDashboard