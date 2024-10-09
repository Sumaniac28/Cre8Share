import React, { useState, useEffect } from "react";
import styles from "./AddStockForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import ErrorPage from "../../Pages/ErrorPages/ErrorPage/ErrorPage";
import { useSelector } from "react-redux";

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
    if (!isSubmitEnabled) {
      window.alert(
        "You can only allocate new stocks when your previous stocks are 50% sold out and has more than or equal to 5 unique buyers."
      );
      return;
    }

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
      await axios.post("http://localhost:8000/stocks/addStock", data, {
        withCredentials: true,
      });
      socket.emit("addCreatorStocks");
      navigate("/creator");
    } catch (error) {
      alert("Failed to add stock");
      console.error("Failed to add stock:", error);
    }
  };

  const creatorStocks = useSelector((state) => state.CreatorStocks.data);
  const creatorStocksStatus = useSelector(
    (state) => state.CreatorStocks.status
  );
  const creatorStocksError = useSelector((state) => state.CreatorStocks.error);
  const errorCode = useSelector((state) => state.CreatorStocks.errorCode);

  if (creatorStocksError) {
    return <ErrorPage errorCode={errorCode} errorMsg={creatorStocksError} />;
  }

  // if (creatorStocksStatus === "loading") {
  //   return <Loader />;
  // }

  let isSubmitEnabled =
    (creatorStocks.length > 0 &&
      creatorStocks[0].totalSoldPercentage >= 50 &&
      creatorStocks[0].uniqueBuyers.length >= 5) ||
    creatorStocks.length === 0;

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
          <button type="submit">
            Add Stock
          </button>
        </form>
      </div>
      <div id={styles.recentStockInfo}>
        <p>
          <span style={{ color: "wheat" }}>A special note to the creator:</span>
          <br />
          <br />
          You can only allocate new stocks when your previous stocks are 50%
          sold out and has more than or equal to 5 unique buyers.
        </p>
        {creatorStocks.length > 0 ? (
          <ul id={styles.recentStock}>
            <h2>Your recent stock data:-</h2>
            <li>
              <span>Name: </span>
              {creatorStocks[0].name}
            </li>
            <li>
              <span>Unique Buyers: </span>
              {creatorStocks[0].uniqueBuyers.length}
            </li>
            <li>
              <span>Sold Percentage: </span>
              {creatorStocks[0].totalSoldPercentage + "%"}
            </li>
          </ul>
        ) : (
          <p>No recent stock data found</p>
        )}
      </div>
    </div>
  );
}

export default AddStockForm;
