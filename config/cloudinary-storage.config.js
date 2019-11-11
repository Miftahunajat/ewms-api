const cloudinary = require('./cloudinary.config');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "ekita-assets",
    allowedFormats: ["jpg", "png", "jpeg", "mp3", "wav"]
});

module.exports = storage;