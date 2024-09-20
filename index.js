const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bagData = require("./models/usermodel"); // Assuming a Mongoose model for user data

// Initialize express app
const app = express();

// Middleware setup
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User Registration Route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await bagData.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered' });
        }

        // Hash the password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await bagData.create({ username, email, password: hashedPassword });

        res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during signup' });
    }
});


// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await bagData.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful!', token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
