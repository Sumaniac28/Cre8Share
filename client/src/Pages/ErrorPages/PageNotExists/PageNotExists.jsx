import React from 'react'
import styles from './PageNotExists.module.css'
import { Link } from 'react-router-dom'

function PageNotExists() {
  return (
    <div className={styles.container}>
    <div className={styles.content}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.message}>Oops! Page Not Found</h2>
      <p className={styles.description}>
        The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className={styles.homeLink}>
        Back to Homepage
      </Link>
    </div>
  </div>
  )
}

export default PageNotExists