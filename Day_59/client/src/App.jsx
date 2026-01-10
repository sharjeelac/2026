import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Load Images
  const fetchImages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/images?page=${page}&limit=4`
      );
      setImages(res.data.images);
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

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
      <div
        style={{
          background: "#f0f0f0",
          padding: "20px",
          display: "inline-block",
        }}
      >
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          style={{ marginLeft: "10px", padding: "5px 20px" }}
        >
          Upload Now
        </button>
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        {images.map((img) => (
          <div
            key={img._id}
            style={{ border: "1px solid #ccc", padding: "5px" }}
          >
            <img
              src={img.imageUrl}
              alt="cloud"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrev}
          disabled={page === 1} // Agar page 1 hai to button disable
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
            opacity: page === 1 ? 0.5 : 1,
          }}
        >
          ⬅️ Previous
        </button>

        <span style={{ fontWeight: "bold", fontSize: "18px" }}> {page} </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages} // Agar last page hai to disable
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
            opacity: page === totalPages ? 0.5 : 1,
          }}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default App;
