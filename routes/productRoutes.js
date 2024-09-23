const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const upload = require('../middleware/multer');
const router = express.Router();

// Route to add a product
router.post('/product', upload.single('uploadimage'), addProduct);

// Route to get all products
router.get('/product', getAllProducts);

module.exports = router;
