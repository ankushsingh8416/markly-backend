const mongoose = require("mongoose");

// Replace with your actual password and connection URI
const mongoURI = "mongodb+srv://nkshrazz:jJHgjfAM0kLQVX4x@cluster0.pksyo.mongodb.net/baguser?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Define the schema
const bagUserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

// Create the model
const bagData = mongoose.model("bagData", bagUserSchema);

module.exports = bagData;
