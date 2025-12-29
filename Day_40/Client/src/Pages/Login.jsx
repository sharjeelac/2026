import axios from "axios";
import React, { useState } from "react";
import API from "../API";
import { useAuthContext } from "../Context/AuthContext";
import {Link} from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loginAction } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/login`, { email, password });
      loginAction(res.data.user, res.data.token);
      alert(res.data.message);
    } catch (error) {
      console.log(`Login Failed`, error.reponse?.data || error.message);
      alert(`Login Failed`, error.reponse?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-1/4 flex flex-col justify-center items-center bg-white shadow-lg py-6 px-10">
        <h2 className="text-3xl font-bold mb-5">Login </h2>
        <form onSubmit={handleLogin} className=" flex flex-col gap-6 text-xl w-full">
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 p-2 rounded-md focus:outline-none border-gray-400"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 p-2 rounded-md focus:outline-none border-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-400 px-8 py-4 rounded-full text-xl text-white cursor-pointer hover:bg-white hover:text-gray-600 border-2  border-blue-400 hover:border-2 mb-4"
          >
            Login
          </button>
          <Link to={"/register"} className="text-center text-sm text-blue-500">
            if don't Account Register Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
