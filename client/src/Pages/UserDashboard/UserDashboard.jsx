import React from 'react'
import UserInfo from '../../Components/UserInfo/UserInfo'
import Cre8shareCoins from '../../Components/Cre8ShareCoins/Cre8shareCoins';
import styles from './UserDashboard.module.css'
import UserPortfolio from '../../Components/UserPortfolio/UserPortfolio';

function UserDashboard() {
  return (
    <>
      <div id={styles.DashBoardContainer}>
          <UserInfo/>
          <Cre8shareCoins/>
      </div>
       <div id={styles.PortfolioContainer}>
        <UserPortfolio/>
       </div>
    </>
  )
}

export default UserDashboard