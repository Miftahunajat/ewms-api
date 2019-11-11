const multer = require('multer');
const storage = require('./cloudinary-storage.config');

const upload = multer({
    storage: storage
});

module.exports = upload;