import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username: "sharjeel",
          password: "1234",
        },
        {
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError(
          "NetWork Error : Please check your Internet or Try agin later"
        );
      } else {
        setError("Something went wrong , please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);

      setMessage(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          error.message ||
          "something went wrong please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError("");
    try {
      // 👇 Add { withCredentials: true } here!
      const res = await axios.get("http://localhost:3000/api/auth/refresh", {
        withCredentials: true,
      });

      console.log("New Access Token:", res.data.accessToken);

      // Update your state/localStorage with the new token
      setToken(res.data.token);
      setMessage(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button onClick={handlLogin}>Login</button>
        <button onClick={handleRefresh}>Refresh</button>
        <button onClick={handleProfile}>Profile</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>{loading ? <p>Loading...</p> : <p>{message}</p>}</div>
    </>
  );
};

export default App;
