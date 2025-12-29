import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import { useAuthContext } from "../Context/AuthContext";

const Details = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getPost = async () => {
    try {
      const res = await axios.get(`${API}/posts/${id}`);
      setPost(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(`Failed`, error.response?.data || error.message);
      alert("Failed: " + (error.response?.data?.message || error.message));

    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!post) return <h2>Post Not found</h2>;
  return (
    <>
      <div className="flex flex-col w-4/5 mx-auto my-4 ">
        <h2 className="text-3xl font-medium mb-4">{post.title}</h2>
        <p className="text-gray-600 mb-4 ">{post.content}</p>
        <h3 className="text-lg text-gray-400">Author : {post.author?.name}</h3>
      </div>
    </>
  );
};

export default Details;
