import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, token, logoutAction } = useAuthContext();
  return (
    <>
      <div className="px-8 py-4 flex justify-between items-center shadow-md ">
        <Link to={"/"}>
          <div>
            <h1 className="text-2xl font-bold">Tech Crunch</h1>
          </div>
        </Link>

        {/* Links */}
        {user ? (
          <div className="flex justify-between items-center flex-row gap-4 text-xl text-gray-500">
            <Link
              to={"/new"}
              className="bg-blue-400 rounded-full text-white py-2 px-4"
            >
              Add Post
            </Link>
            <Link to={"/profile"}>Profile</Link>
            <Link onClick={logoutAction}>logout</Link>
          </div>
        ) : (
          <div className="flex justify-between items-center flex-row gap-4 text-xl ">
            <Link
              className="bg-blue-400 rounded-full text-white py-2 px-4 hover:bg-white border-blue-400 hover:border-2 hover:text-gray-500"
              to={"/register"}
            >
              Register
            </Link>
            <Link
              className="border-blue-400 border-2 rounded-full  py-2 px-4 hover:bg-blue-400"
              to={"/login"}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
