import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
import API from "../API";

// --- CHILD COMPONENT: PostItem ---
// Handles the display and "Read More" logic for a single post
const PostItem = ({ post, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-4 transition hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-bold text-gray-800">{post.title}</h4>
      </div>

      {/* Content with Read More Logic */}
      <div className="text-gray-600 mb-4">
        <p className={isExpanded ? "line-clamp-none" : "line-clamp-3"}>
          {post.content}
        </p>
        
        {/* Only show button if content is long enough (optional logic can go here) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold mt-1 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 border-t pt-4 border-gray-100">
        <button
          onClick={() => onEdit(post._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: Profile ---
const Profile = () => {
  const { token, user } = useAuthContext();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState("");

  const getUserPosts = async () => {
    try {
      const res = await axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPosts(res.data.posts || []);
    } catch (error) {
      console.log("Failed", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${API}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      alert("Failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (id) => {
    const post = userPosts.find((post) => post._id === id);
    if (!post) return alert("Post not found");

    setIsEditing(true);
    setEditId(id);
    setTitle(post.title);
    setContent(post.content);
    
    // Smooth scroll to top to see the edit form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API}/posts/${editId}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserPosts((prev) =>
        prev.map((post) => (post._id === editId ? res.data.data : post))
      );
      setIsEditing(false);
      alert(`Post Updated Successfully`);
    } catch (error) {
      console.log("Error", error.response?.data?.message || error.message);
    }
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500 font-medium">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* --- Profile Header Section --- */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h2>
        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Name:</span> {user?.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Email:</span> {user?.email}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-8"></div>

      {/* --- Edit Form (Only visible when editing) --- */}
      {isEditing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Edit Post</h3>
          <form onSubmit={updatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                placeholder="Enter Title"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={content}
                placeholder="Enter Content"
                required
                rows="4"
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-medium transition"
              >
                Update Post
              </button>
              <button
                type="button"
                onClick={cancelUpdate}
                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- Posts List --- */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">My Posts</h3>

        {(!userPosts || userPosts.length === 0) && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
            No posts found. Start writing!
          </div>
        )}

        {userPosts.map((post) => (
          <PostItem 
            key={post._id} 
            post={post} 
            onEdit={handleEdit} 
            onDelete={deletePost} 
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;