import React, { useState } from "react";
import styles from "./BuyStockModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

function BuyStockModal({ stock, onClose }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleBuy = async (e) => {
    e.preventDefault();

    if (stock.stocksUnallocated < quantity) {
      alert("Not enough quantity available");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity should be greater than 0");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/users/buy/${stock._id}`,
        { quantity },
        {withCredentials: true}
      );
      socket.emit("buyStock", stock._id);
      onClose();
      navigate("/user");
    } catch (error) {
      console.error("Error buying stock:", error);
      alert("Error buying stock");
    }
  };

  return (
    <div id={styles.buyStockModalContainer}>
      <div id={styles.stockInfo}>
        <p>You are buying {stock.name}</p>
        <p>Price - {stock.currentPrice.toFixed(3)}</p>
        <p>Quantity Available - {stock.stocksUnallocated}</p>
      </div>
      <form id={styles.buyStockForm} onSubmit={handleBuy}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button type="submit">Buy</button>
      </form>
      <div className={styles.closeBtn} onClick={onClose}>
        X
      </div>
    </div>
  );
}

export default BuyStockModal;
