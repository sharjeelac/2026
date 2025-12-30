import React, { useState } from "react";
import api from "./api";

const App = () => {
  const [message, setMessage] = useState("");

  // 1. LOGIN
  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username: "ali", password: "123" });
      
      // Token ko LocalStorage me daal rahe hain taaki api.js padh sake
      // (Advanced apps me hum memory variable use karte hain, par ye easy tarika hai)
      localStorage.setItem("accessToken", res.data.accessToken); 
      
      setMessage("Login Successful! Token Saved.");
    } catch (error) {
      setMessage("Login Failed");
    }
  };

  // 2. GET DATA (Dekho, hum koi Header nahi bhej rahe! 😲)
  const handleGetProtected = async () => {
    try {
      // Interceptor khud Token laga dega
      const res = await api.get("/protected"); 
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  // 3. MANUAL REFRESH BUTTON KI ZAROORAT NAHI AB! ❌
  // Humne hata diya

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Auto-Refresh Playground 🕵️‍♂️</h1>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={handleLogin}>1. Login</button>
        <button onClick={handleGetProtected}>2. Get Protected Data</button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
        <h3>Status:</h3>
        <p style={{ fontWeight: "bold", color: "blue" }}>{message}</p>
        <p style={{fontSize: '12px', color: 'gray'}}>Open Console to see the magic!</p>
      </div>
    </div>
  );
};

export default App;