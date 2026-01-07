import multer from "multer";
import { storage } from "../cloudinary-config.js";

const upload = multer({
  storage: storage,
});

export default upload;
