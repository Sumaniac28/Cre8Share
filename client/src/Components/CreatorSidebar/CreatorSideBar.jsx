import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CreatorSideBar.module.css';

function CreatorSideBar() {
  const sidebarItems = [
    {
      icon: 'fa-chart-line',
      label: 'Dashboard',
      path: '/creator',
    },
    {
      icon: 'fa-plus',
      label: 'Allocate Stocks',
      path: '/creator/allocateStocks',
    },
    {
      icon: 'fa-arrow-trend-up',
      label: 'Your Stocks',
      path: '/creator/allocatedStocks',
    },
    {
      icon: 'fa-book',
      label: 'Education',
      path: '#',
    },
    {
      icon: 'fa-phone',
      label: 'Contact Us',
      path: '/contact',
    },
    {
      icon: 'fa-right-from-bracket',
      label: 'Log Out',
      path: '/creator/logout',
      id: styles.signOut,
    },
  ];

  return (
    <div className={styles.Container}>
      <div className={styles.SidebarContainer}>
        {sidebarItems.map((item, index) => (
          <span key={index} id={item.id}>
            <Link to={item.path}>
            <i className={`fa-solid ${item.icon}`}></i>
            {item.path === '#' ? (
              <a href={item.path}>{item.label}</a>
            ) : (
              item.label
            )}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export default CreatorSideBar;
