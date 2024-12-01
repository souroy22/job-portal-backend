import multer from "multer";

// Set up Multer to use Cloudinary as storage
const storage = multer.memoryStorage();

const upload = multer({ storage });

export { upload };
