import React from "react";
import EducationComponent from "../../Components/EducationComponent/EducationComponent";
import styles from "./Education.module.css";

function Education() {
  return (
    <section id={styles.EducationSection}>
      <EducationComponent />
    </section>
  );
}

export default Education;
