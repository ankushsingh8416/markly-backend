const Product = require('../models/productmodel');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Add Product and Upload Image to Cloudinary
exports.addProduct = (req, res) => {
    const { title, description, price,color } = req.body;
    const image = req.file;

    if (!title || !description || !price || !image || !color) {
        return res.status(400).json({ message: 'Please fill all fields and upload an image' });
    }

    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'products' }, async (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Image upload failed' });
        }

        const product = new Product({
            title,
            description,
            price,
            color,
            imageUrl: result.secure_url
        });


        try {
            await product.save();
            const allProducts = await Product.find();
            res.status(200).json(allProducts);
        } catch (err) {
            res.status(500).json({ error: 'Error saving product' });
        }
    });

    streamifier.createReadStream(image.buffer).pipe(uploadStream);
};

// Fetch All Products
exports.getAllProducts = async (req, res) => {

    const allProducts = await Product.find();
    res.json(allProducts);
};
