import React, { useState, useEffect } from "react";
import styles from "./AddStockForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

function AddStockForm() {
  const navigate = useNavigate();
  const [requestOTP, setRequestOTP] = useState(false);
  const [stockName, setStockName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);

  const isRequestOTPEnabled =
    stockName.trim() !== "" && stockQuantity.trim() !== "";

  // Function to generate OTP
  const generateOtp = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  const sendOtp = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/creators/sendOTP",
        { otp },
        { withCredentials: true }
      );
      console.log("OTP sent successfully:", response);
    } catch (error) {
      alert("Failed to send OTP");
      console.error("Failed to send OTP:", error);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isRequestOTPEnabled || remainingTime > 0) return;

    let otpToSend = generatedOtp;

    if (!otpSent) {
      otpToSend = generateOtp();
      setGeneratedOtp(otpToSend);
    }

    await sendOtp(otpToSend);

    setRequestOTP(true);
    setOtpSent(true);
    setOtpExpiry(Date.now() + 10 * 60 * 1000);
    setRemainingTime(180);
  };

  useEffect(() => {
    if (otpExpiry) {
      const interval = setInterval(() => {
        const timeLeft = Math.max(0, otpExpiry - Date.now());
        if (timeLeft === 0) {
          setRequestOTP(false);
          setOtpSent(false);
          setOtpExpiry(null);
          setGeneratedOtp("");
          setRemainingTime(0);
          clearInterval(interval);
        } else {
          setRemainingTime(Math.floor((timeLeft % (60 * 1000)) / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpExpiry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      alert("Please request an OTP before submitting.");
      return;
    }

    if (otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    const data = {
      name: stockName,
      quantity: stockQuantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/stocks/addStock",
        data,
        { withCredentials: true }
      );
      socket.emit("addCreatorStocks");
      navigate("/creator");
    } catch (error) {
      alert("Failed to add stock");
      console.error("Failed to add stock:", error);
    }
  };

  return (
    <div id={styles.allocateStocksContainer}>
      <div className={styles.formContainer}>
        <h2>Add Stock</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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
              <input
                type="number"
                placeholder="OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}
          <div
            id={styles.reqOTP}
            onClick={handleSendOtp}
            style={{
              cursor:
                isRequestOTPEnabled && remainingTime === 0
                  ? "pointer"
                  : "not-allowed",
              opacity: isRequestOTPEnabled && remainingTime === 0 ? 1 : 0.5,
            }}
          >
            {otpSent ? `Send OTP Again (${remainingTime}s)` : "Request OTP"}
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
