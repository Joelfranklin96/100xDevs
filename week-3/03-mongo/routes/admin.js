const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db/index");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try{
        const username = req.body.username;
        const password = req.body.password;
        const newAdmin = new Admin({'username': username, 'password': password});
        const result = await newAdmin.save();
        return res.status(200).json({ message: 'Admin created successfully' });
    }
    catch(error){
        return res.status(404).json('An error occurred');
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try{
        const newCourse = await Course.create({title: req.body.title, description: req.body.description, price: req.body.price, imageLink: req.body.imageLink, published: true});
        return res.status(200).json({ 'message': 'Course created successfully', 'courseId': newCourse._id });
    }
    catch(error){
        return res.status(404).json('An error occurred');
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const courses = await Course.find({});
        return res.status(200).json({ 'courses': courses});
    }
    catch(error){
        return res.status(404).json('An error occurred');
    }
});

module.exports = router;