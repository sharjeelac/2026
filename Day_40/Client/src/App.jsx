import React from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Register from "../src/Pages/Register";
import Login from "../src/Pages/Login";
import Profile from "../src/Pages/Profile";
import Home from "./Pages/Home";
import RequireAuth from "../src/Components/RequireAuth";
import NewPost from "./Pages/NewPost";
import Details from "../src/Pages/Details";

const App = () => {
  return (
    <div>
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/new"
          element={
            <RequireAuth>
              <NewPost />
            </RequireAuth>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <RequireAuth>
              <Details />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
