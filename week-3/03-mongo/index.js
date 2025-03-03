const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Notes

// The app.use() method in Express serves two primary functions:
// It can attach middleware functions that process all incoming requests (or requests matching a specific path).
// app.use("/admin", adminRouter) mounts the adminRouter so that all routes defined within it are prefixed with /admin.