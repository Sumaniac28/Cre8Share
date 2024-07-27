import React, { useState } from "react";
import styles from "./Navbar.module.css";
import anotherLogo from "../../assets/images/anotherLogo.png";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menu = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Education", url: "/education" },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const toggleIndex = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index); 
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
          <li key={item.id} >
            <a
              onClick={()=>toggleIndex(index)}
              href={item.url}
              className={activeIndex === index ? styles.activeMenu : ""}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.getStarted}>
        <a href="/signup">Get Started</a>
      </div>
    </div>
  );
}

export default Navbar;
