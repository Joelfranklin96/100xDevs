const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, User, Course} = require("../db/index");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try{
        const result = await Admin.Create({'username': req.headers['username'], 'password': req.headers['password']});
        return res.json({ message: "Admin created successfully" })
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
    
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try{
        const result  = await Admin.findOne({'username': req.headers['username'], 'password': req.headers['password']});
        if(result){
            const token = jwt.sign({'username':username}, JWT_SECRET);
            return res.status(200).json({"token": token});
        }
        else{
            return res.status(404).json("Incorrect username/password");
        }
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try{
        const newCourse = new Course({title: req.body.title, description: req.body.description, price: req.body.price, imageLink: req.body.imageLink, published: true});
        const result = await newCourse.save();
        return res.status(200).json({ 'message': 'Course created successfully', 'courseId': result._id });
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const couses = await Course.find({});
        return res.status(200).json({"courses": courses});
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

module.exports = router;