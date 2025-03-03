const fs = require('fs');

fs.writeFile("01-async-js/easy/sample2.txt", "Hello world", 'utf-8', function(err){
    console.log("Data successfully written");
})