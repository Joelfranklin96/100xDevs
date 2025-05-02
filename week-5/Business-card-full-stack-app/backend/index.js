const cors = require('cors');
const express = require('express')
const { user } = require('./db');
const { UserDetails } = require('./types');
const app = express()
const port = 3000

app.use(cors({
    origin: true,     // ← exact origin or an array/regex
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false                  // set to true only if you’ll send cookies / auth headers
  }));

app.use(express.json());

app.get('/', async function(req, res){
    try{
        const records = await user.find({});
        return res.status(200).json(records);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Database error");
    }
})

app.post('/', async function(req, res){
    try{
        const newUserRecord = req.body;
        const validation = UserDetails.safeParse(newUserRecord);
        if (validation.success){
        const interests = newUserRecord.interestString.split(",").map(function(interest){return interest.trim()});
        const newUser = await user.create({name: newUserRecord.name, description: newUserRecord.description, 
                            linkedinUrl: newUserRecord.linkedinUrl, twitterUrl: newUserRecord.twitterUrl,
                            interests: interests});
        return res.status(200).json({
            success: true,
            message: "Successfully written to database",
            data: newUser
          });
        }
        else{
            return res.status(400).json("Validation error");
        }
    }
    catch{
    return res.status(500).json("Writing to Database error");
    }
});

app.listen(port, function(req, res){
    console.log(`Example app listening on port ${port}`)
  });