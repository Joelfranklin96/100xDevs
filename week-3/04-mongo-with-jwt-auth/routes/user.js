const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Admin, User, Course} = require("../db/index");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try{
        const result = await User.Create({'username': req.headers['username'], 'password': req.headers['password']});
        return res.json({ message: "User created successfully" })
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try{
        const result  = await User.findOne({'username': req.headers['username'], 'password': req.headers['password']});
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses = await Course.find({});
        return res.status(200).json({"courses": courses});
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try{
        const courseId = req.params['courseId'];
        req.user.purchasedCourses.push(courseId);
        await req.user.save()
        return res.status(200).json({ message: "Course purchased successfully"});
    }
    catch(error){
        return res.status(404).json("An error occurred");
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const purchasedCourses = await Course.find({"_id":{$in : req.user.purchasedCourses}});
        res.status(200).json({'output': purchasedCourses});
    }
    catch(error){
        res.status(404).json("An error occurred");
    }
});

module.exports = router