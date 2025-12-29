import axios from "axios";
import React, { useState } from "react";
import API from "../API";
import { useAuthContext } from "../Context/AuthContext";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { token } = useAuthContext();

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/posts`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);

      setTitle("");
      setContent("");
    } catch (error) {
      console.log(`Publish Failed`, error.response?.data || error.message);
      alert(
        "Failed to Publish",
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <>
      <div className="h-screen flex w-full justify-between items-center bg-gray-200">
        <div className="w-3/4 flex flex-col bg-white items-center justify-center gap-8 mx-auto p-4 rounded">
          <h2 className="text-3xl font-bold">Add New Post</h2>
          <form onSubmit={handleAddPost} className="flex flex-col gap-6 w-full ">
            <input
              type="text"
              placeholder="Enter Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none mb-4"
            />

            <textarea
              placeholder="Enter Detaills Here"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded "
              rows="6"
            ></textarea>
            <button type="submit" className="bg-blue-400 border border-blue-400 text-white py-2 px-4 rounded hover:bg-white hover:text-black cursor-pointer shadow-2xl ">Publish</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPost;
