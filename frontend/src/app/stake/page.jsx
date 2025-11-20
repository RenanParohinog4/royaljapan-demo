"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./stake.module.css";

import LoadingSpinner from "@/components/LoadingSpinner";
import MessageBox from "@/components/MessageBox";


export default function StakePage() {
  const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [spinnerVisibility, setSpinnerVisibility] = useState(false)
  const [messageBoxText, setMessageBoxText] = useState("")
  const [messageBoxVisibility, setMessageBoxVisibility] = useState(false);

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const numberValue = parseFloat(amount);

    if (isNaN(numberValue) || numberValue <= 0) {
      setError("Please enter a valid number greater than 0");
      return;
    }

    try {
      setSpinnerVisibility(true);
      const response = await axios.post(`${baseurl}/api/stake`, {
        amount: numberValue,
      });
      setSpinnerVisibility(false);
      setSuccess(response.data.message);
      setAmount("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message || "Invalid input");
      } else {
        setTimeout(() => {
          setMessageBoxVisibility(true);
          setMessageBoxText(`${err.message ? err.message : 'Something went wrong!'}`)
        },1000)
      }
    }
  };

  return (
    <>
    <MessageBox message={messageBoxText} visible={messageBoxVisibility}></MessageBox>
      <LoadingSpinner visible={spinnerVisibility}></LoadingSpinner>
      <div className={styles.parent_container}>
        <div className={styles.container}>
          <h1 className={styles.title}>Stake Amount</h1>
          <div className={styles.form}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              placeholder="Enter amount"
            />
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button onClick={handleSubmit} className={styles.button}>Submit</button>
          </div>
          </div>
      </div>

    </>
  );
}
