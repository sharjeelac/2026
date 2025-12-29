import React, { useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { posts } = useAuthContext();

  return (
    <>
      <div className=" flex flex-col w-4/5 mx-auto my-6">
        <h2 className="text-3xl font-medium mb-4">Latest Post</h2>
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className=" flex flex-col mb-4 border rounded-xl p-4 shadow-md "
          >
            <div>
              <h3 className="text-2xl font-medium text-blue-900 mb-1">
                {post.title}
              </h3>
              <p className="text-gray-400 line-clamp-2">{post.content}</p>
              <button class="mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm focus:outline-none hover:underline">Read More
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
