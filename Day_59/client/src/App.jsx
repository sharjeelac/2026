import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // 1. Load Images
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/images");
      setImages(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 2. Upload Logic
  const handleUpload = async () => {
    if (!file) return alert("File select karo bhai!");

    const formData = new FormData();
    // 👇 YAHA DHYAN DENA: Ye naam Backend ke 'upload.single' jaisa hona chahiye
    formData.append("image", file); 

    try {
      await axios.post("http://localhost:3000/upload", formData);
      alert("Upload Ho Gaya! ☁️");
      setFile(null);
      fetchImages(); // Refresh gallery
    } catch (err) {
      console.error(err);
      alert("Upload Failed. Console check karo.");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>☁️ My Cloud Gallery</h1>
      
      {/* Upload Box */}
      <div style={{ background: "#f0f0f0", padding: "20px", display: "inline-block" }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={{ marginLeft: "10px", padding: "5px 20px" }}>
          Upload Now
        </button>
      </div>

      {/* Gallery Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "30px", justifyContent: "center" }}>
        {images.map((img) => (
          <div key={img._id} style={{ border: "1px solid #ccc", padding: "5px" }}>
            <img src={img.imageUrl} alt="cloud" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;