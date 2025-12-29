import React, { useState } from "react";
import axios from "axios";
import API from "../API.js";
import { useAuthContext } from "../Context/AuthContext";
import {Link} from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginAction } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        email,
        password,
      };
      const res = await axios.post(`${API}/users/register`, formData);
      loginAction(res.data.user, res.data.token);
      alert(`success : ${res.data.message}  `);
    } catch (error) {
      console.log("Register Error", error.response?.data || error.message);
      alert(
        "Failed to Regiter",
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="w-1/4 flex flex-col justify-center items-center bg-white shadow-lg py-6 px-10">
          <h2 className="text-3xl font-bold mb-5">Register</h2>
          <form onSubmit={handleRegister} className=" flex flex-col gap-6 text-xl w-full">
            <input
              type="text0"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              className="border-2 p-2 rounded-md focus:outline-none border-gray-400"
            />
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 p-2 rounded-md focus:outline-none border-gray-400"
            />
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 p-2 rounded-md focus:outline-none border-gray-400"
            />
            <button type="submit" className="bg-blue-400 px-8 py-4 rounded-full text-xl text-white cursor-pointer hover:bg-white hover:text-gray-600 border-2  border-blue-400 hover:border-2 mb-4">Login</button>
            <Link to={'/login'} className="text-center text-sm text-blue-500">Already Account Login Here</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
