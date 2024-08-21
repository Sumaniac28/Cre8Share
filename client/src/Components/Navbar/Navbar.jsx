import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import anotherLogo from "../../assets/images/anotherLogo.png";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const menu = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Education", url: "/education" },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const toggleIndex = (index, url) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      navigate(url); // Navigate to the specified URL
    }
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.AboutCompany}>
        <img src={anotherLogo} alt="Company Logo" />
        <h1>CRE8SHARE</h1>
      </div>
      <ul>
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
      <div className={styles.getStarted}>
        <button onClick={() => navigate("/signup")}>Get Started</button>
      </div>
    </div>
  );
}

export default Navbar;
