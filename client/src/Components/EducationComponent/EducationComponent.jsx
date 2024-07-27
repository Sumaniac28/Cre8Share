import React, { useState } from "react";
import styles from "./EducationComponent.module.css";
import EducationImage from "../../assets/images/EducationLogo.png";
import HelpSection from "../HelpSection/HelpSection";
import { Routes, Route, Link } from "react-router-dom";
import CreatorEducation from "../CreatorEducation/CreatorEducation";
import UserEducation from "../UserEducation/UserEducation";

function EducationComponent() {
  const [role, setRole] = useState(null);
  return (
    <>
      <section id={styles.aboutEducation} className={styles.padding10px}>
        <h1 className={styles.aboutHeadings}>What is CRE8SHARE Education?</h1>
        <div id={styles.aboutEducationContainer}>
          <div className={styles.imageContainer}>
            <img src={EducationImage} alt="About Cre8share" />
          </div>
          <p>
            CRE8SHARE education is a platform to educate creators and users
            about the our platform. Creators can learn how to allocate their
            stocks and see their performance. We help users to learn how they
            can support their favorite creators financially and share in their
            success. Users can also learn how to earn profits if their creator
            does well.
            <br />
            <br />
            This platform's aim is to make users aware of the platform and how
            they can use it to their advantage.
          </p>
        </div>
      </section>
      <section id={styles.educationContainer}>
      <div id={styles.roleTitles}>
          <Link to="creatorEducation" onClick={()=> setRole('creator')}>  <p
            className={role === "creator" ? styles.activeRole : ""}
          >
            Creator Education
          </p></Link>
         <Link to="userEducation" onClick={()=> setRole('user')}>  <p
            className={role === "user" ? styles.activeRole : ""}
          >
          User Education
          </p></Link>
        </div>
        <Routes>
          <Route path="creatorEducation" element={<CreatorEducation />} />
          <Route path="userEducation" element={<UserEducation/>}/>
        </Routes>
      </section>
      <HelpSection />
    </>
  );
}

export default EducationComponent;
