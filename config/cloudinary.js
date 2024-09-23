const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dvucqewfn',
    api_key: process.env.CLOUDINARY_API_KEY || '768488217251427',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'mLGFOKxqK9_9OmypkBEsKcAM8eA',
});

module.exports = cloudinary;
