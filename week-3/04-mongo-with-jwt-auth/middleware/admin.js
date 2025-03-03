const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const bearer = req.headers['Authorization'];
    const token = bearer.split(" ")[1];
    try{
        jwt.verify(token, JWT_SECRET);
    }
    catch(error){
        return res.status(401).json("Incorrect username/password");
    }
    return next();
}

module.exports = adminMiddleware;