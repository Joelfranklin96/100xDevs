const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers['username'];
    const password = req.headers['password'];

    const admin = await Admin.findOne({'username': username, 'password': password});
    
    if(admin){
        return next();
    }
    else{
        return res.status(401).send("Wrong username/password");
    }

}

module.exports = adminMiddleware;