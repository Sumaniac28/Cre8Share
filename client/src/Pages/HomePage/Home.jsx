import React from "react";
import styles from "./Home.module.css";
import HeroPage from "../../Components/HeroPage/HeroPage";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import About from "../About/About";
import Education from "../Education/Education";
import ContactSection from "../ContactSection/ContactSection";
import PageNotExists from "../ErrorPages/PageNotExists/PageNotExists";

function Home() {
  return (
    <section id={styles.HomeContainer}>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/education/*" element={<Education />} />
          <Route path="/contact" element={<ContactSection />} />
        </Route>
        <Route path="*" element={<PageNotExists/>} />
      </Routes>
    </section>
  );
}

export default Home;
