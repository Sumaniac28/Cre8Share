import React from 'react'
import styles from './Loader.module.css'
function Loader() {
  return (
    <div id={styles.loaderContainer}>
        <span class={styles.loader}></span>
    </div>
  )
}

export default Loader