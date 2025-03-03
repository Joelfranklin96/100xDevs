const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const bearer = req.headers['Authorization'];
    const token = bearer.split(" ")[1];
    try{
        const payload = jwt.verify(token, JWT_SECRET);
    }
    catch(error){
        return res.status(401).json("Incorrect username/password");
    }
    req.user = payload.username;
    return next();
}

module.exports = userMiddleware;