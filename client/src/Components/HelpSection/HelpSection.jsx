import React from "react";
import styles from "./HelpSection.module.css";
function HelpSection() {
  return (
    <div id={styles.helpSection}>
      Need any further help?{" "}
      <span>
        <a href="/">Contact us</a>
      </span>
    </div>
  );
}

export default HelpSection;
