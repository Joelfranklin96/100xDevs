const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('your-connection-string');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses:{
        type: Array
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageLink:{
        type: URL,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}

// Notes
// The above script doesn't create a database. The script connects to an existing MongoDB instance and defines the 
// structure (schemas and models) for the data. In MongoDB, databases and collections are created automatically when we insert our 
// first document if they don't already exist.

// Using these models defined (and exported) in the script, we insert the data into the database.