import React, { useState } from "react";
import styles from "./AddStockForm.module.css";

function AddStockForm({ hideAddStockModal }) {
  const [requestOTP, setrequestOTP] = useState(false);
  const [stockName, setStockName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const isRequestOTPEnabled =
    stockName.trim() !== "" && stockQuantity.trim() !== "";

  return (
    <div id={styles.allocateStocksContainer}>
      <div className={styles.formContainer}>
        <h2>Add stock</h2>
        <form className={styles.form}>
          <label htmlFor="stockName">Stock Name</label>
          <input
            type="text"
            placeholder="Stock Name"
            name="stockName"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            required
          />
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            placeholder="Stock Quantity"
            name="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
          {requestOTP && (
            <>
              <label htmlFor="otp">OTP</label>
              <input type="number" placeholder="OTP" name="otp" required />
            </>
          )}
          <div
            id={styles.reqOTP}
            onClick={(e) => {
              e.preventDefault();
              if (isRequestOTPEnabled) {
                setrequestOTP(true);
              }
            }}
            style={{
              cursor: isRequestOTPEnabled ? "pointer" : "not-allowed",
              opacity: isRequestOTPEnabled ? 1 : 0.5,
            }}
          >
            {requestOTP ? "Send OTP again" : "Request OTP"}
          </div>
          <button type="submit">Add Stock</button>
        </form>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
        accusantium recusandae delectus debitis rerum perspiciatis voluptatem
        velit fugiat veniam fugit esse eveniet possimus, facilis ipsum illum
        dolorem quisquam beatae saepe impedit. Aut dolorum, vitae harum earum
        delectus dolore incidunt nisi.
      </p>
    </div>
  );
}

export default AddStockForm;
