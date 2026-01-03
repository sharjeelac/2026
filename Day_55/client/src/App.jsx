import React, { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Token Pakadne ka Logic 🎣
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Save karo
      window.history.replaceState({}, document.title, "/"); // URL saaf karo
      setIsLoggedIn(true);
    } else {
      // Check karo agar pehle se token saved hai
      if (localStorage.getItem("token")) setIsLoggedIn(true);
    }
  }, []);

  // 2. Login Function
  const handleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  // 3. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>Google Auth Practice 🧪</h1>
      
      {isLoggedIn ? (
        <div style={{ padding: "20px", border: "2px solid green", display: "inline-block" }}>
          <h2>Welcome User! 🎉</h2>
          <p>You are logged in via Google.</p>
          <button onClick={handleLogout} style={{ padding: "10px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={handleLogin} 
          style={{ 
            padding: "15px 30px", 
            fontSize: "18px", 
            background: "#4285F4", 
            color: "white", 
            border: "none", 
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default App;