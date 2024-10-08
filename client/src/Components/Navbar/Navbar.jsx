import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import anotherLogo from "../../assets/images/anotherLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import signature from "../../assets/images/signature_sumit.png"

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for controlling the side drawer
  const navigate = useNavigate();

  const menu = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Education", url: "/education" },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const toggleIndex = (index, url) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      navigate(url);
    }
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.AboutCompany}>
          <img src={anotherLogo} alt="Company Logo" />
          <h1>CRE8SHARE</h1>
        </div>

        <div className={styles.MenuIcon} onClick={toggleDrawer}>
          {drawerOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`${styles.NavLinks} ${drawerOpen ? styles.Open : ""}`}>
          {menu.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => toggleIndex(index, item.url)}
                className={activeIndex === index ? styles.activeMenu : ""}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <a className={styles.signature} href="https://www.linkedin.com/in/sumit-grover-29a277256/" target="_blank" rel="noopener noreferrer" >
          <img src={signature} id={styles.signature} alt="sumit_signature" />
        </a>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
