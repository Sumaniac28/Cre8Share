import React from 'react'
import styles from './ContactSection.module.css'
import ContactComponent from '../../Components/ContactComponent/ContactComponent'
function ContactSection() {
  return (
    <section id={styles.contactContainer} >
        <ContactComponent/>
    </section>
  )
}

export default ContactSection