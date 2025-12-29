import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import API from "../API";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  // Login Function
  const loginAction = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  //logout function
  const logoutAction = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data.data);
    } catch (error) {
      console.log("failed", error.response?.data || error.message);
    }
  };



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    getAllPosts()

    setLoading(false)
  }, []);

  
  return (
    <authContext.Provider value={{ loginAction, logoutAction, user, token, posts, getAllPosts,loading }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => useContext(authContext);
