import React, { useState } from "react";
import styles from "./SellStockModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

function SellStockModal({ stock, onClose }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  console.log(stock.stock._id);

  const handleBuy = async (e) => {
    e.preventDefault();

    if (stock.totalQuantityPerStock < quantity) {
      alert("Not enough quantity available");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity should be greater than 0");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/users/sell/${stock.stock._id}`,
        { quantity },
        {
          withCredentials: true,
        }
      );
      socket.emit("sellStock", stock.stock._id);
      onClose();
      navigate("/user");
    } catch (error) {
      console.error("Error selling stock:", error);
      alert("Error selling stock");
    }
  };

  return (
    <div id={styles.sellStockModalContainer}>
      <div id={styles.stockInfo}>
        <p>You are selling {stock.stock.name}</p>
        <p>Price - {stock.stock.currentPrice}</p>
        <p>Quantity Available - {stock.totalQuantityPerStock}</p>
      </div>
      <form id={styles.sellStockForm} onSubmit={handleBuy}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button type="submit">Sell</button>
      </form>
      <div className={styles.closeBtn} onClick={onClose}>
        X
      </div>
    </div>
  );
}

export default SellStockModal;
