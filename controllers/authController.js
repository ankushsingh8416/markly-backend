const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bagData = require('../models/usermodel');

// User Registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await bagData.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await bagData.create({ username, email, password: hashedPassword });

        res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
        res.status(500).json({ error: 'Error during signup' });
    }
};

// User Login
exports.loginUser = async (req, res) => {
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
};
