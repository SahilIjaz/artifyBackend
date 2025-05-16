const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqavw7pib",
  api_key: "796185497241856",
  api_secret: "kARJE76u3g1Nq7_SaAi43BjsAAc",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Dynamic folders", // folder in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
