import React from 'react'
import styles from './About.module.css'
import AboutComponent from '../../Components/AboutComponent/AboutComponent'
function About() {
  return (
    <section id={styles.aboutSection}>
      <AboutComponent/>
    </section>
  )
}

export default About