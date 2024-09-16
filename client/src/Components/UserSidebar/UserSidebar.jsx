import React from "react";
import styles from "./UserSidebar.module.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
function UserSidebar({ toggleDrawer }) {
  const sidebarItems = [
    {
      icon: "fa-chart-line",
      label: "Dashboard",
      path: "/user",
    },
    {
      icon: "fa-plus",
      label: "Buy Stocks",
      path: "/user/stockmarketplace",
    },
    {
      icon: "fa-arrow-trend-up",
      label: "Holdings",
      path: "/user/userholdings",
    },
    {
      icon: "fa-book",
      label: "Education",
      path: "#",
    },
    {
      icon: "fa-phone",
      label: "Contact Us",
      path: "/contact",
    },
    {
      icon: "fa-right-from-bracket",
      label: "Log Out",
      path: "/user/logout",
      id: styles.signOut,
    },
  ];

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className={styles.Container}>
        <div className={styles.SidebarContainer}>
          {sidebarItems.map((item, index) => (
            <span key={index} id={item.id}>
              <Link to={item.path}>
                <i className={`fa-solid ${item.icon}`}></i>
                {item.path === "#" ? (
                  <a href={item.path}>{item.label}</a>
                ) : (
                  item.label
                )}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </Box>
  );
}

export default UserSidebar;
