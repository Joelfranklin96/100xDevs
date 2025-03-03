const fs = require('fs');

fs.readFile("01-async-js/medium/sample.txt", 'utf-8', function(err, data){
    let trimmed_data = data.trim().replace(/\s+/g, ' ');;
    fs.writeFile("01-async-js/medium/sample.txt", trimmed_data, 'utf-8', function(err){
        console.log("Data successfully written");
    })
})