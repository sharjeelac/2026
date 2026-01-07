import React from "react";
import { useState } from "react";
import axios from 'axios'

const App = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handelUpload = async () => {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await axios.post("http://localhost:3000/api/upload", formData, {
      Headers: { "content-type": "multipart/form-data" },
    });
    alert("upload");
    console.log(res);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <img src={preview} alt="prview" width={100} />
      <button onClick={handelUpload}>Uplaod</button>
    </div>
  );
};

export default App;
