import React from 'react'
import styles from './ValuationCard.module.css'

function ValuationCard() {
  return (
    <>
        <div className={styles.AnalyticsCardTitle}>
        <p>Valuation</p>
        <div className={styles.point} id={styles.valuationPoint}></div>
        </div>
        <h1>$4000</h1>
        <span>(Channel valuation as per our algoritm)</span>
    </>
  )
}

export default ValuationCard