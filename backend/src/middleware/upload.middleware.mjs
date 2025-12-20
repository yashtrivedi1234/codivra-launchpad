import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.mjs";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.uploadFolder || "codivra/uploads";
    return {
      folder: folder,
      resource_type: "auto",
      public_id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };
  },
});

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export const uploadSingle = (
  fieldName = "image",
  folder = "codivra/uploads"
) => {
  return (req, res, next) => {
    req.uploadFolder = folder;
    upload.single(fieldName)(req, res, next);
  };
};

export const uploadMultiple = (
  fieldName = "images",
  maxFiles = 5,
  folder = "codivra/uploads"
) => {
  return (req, res, next) => {
    req.uploadFolder = folder;
    upload.array(fieldName, maxFiles)(req, res, next);
  };
};

export default upload;
