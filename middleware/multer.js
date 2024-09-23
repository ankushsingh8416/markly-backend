const multer = require('multer');

// Setup multer to store files in memory (so that we can send the buffer to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
