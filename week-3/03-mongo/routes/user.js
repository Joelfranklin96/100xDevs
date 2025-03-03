const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try{
        const username = req.body.username;
        const password = req.body.password;
        const newUser = new User({'username': username, 'password': password, 'purchasedCourses':[]});
        const result = await newUser.save();
        return res.status(200).json({ 'message': 'User created successfully' });
    }
    catch(error){
        return res.status(404).send('An error occurred');
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses = await Course.find({});
        return res.status(200).send({'courses': courses});
    }
    catch(error){
        return res.status(404).json("An error occurred.");
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try{
        const courseId = req.params['courseId'];
        req.user.purchasedCourses.push(courseId);
        await req.user.save();
        return res.status(200).json({'message': 'Course purchased successfully'});
    }
    catch(error){
        return res.status(404).send("An error occurred");
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const courses = await Course.find({ '_id': { $in: req.user.purchasedCourses } });
        return res.status(200).json({'purchasedCourses': courses});
    }
    catch(error){
        return res.status(404).send("An error occurred");
    }
});

module.exports = router