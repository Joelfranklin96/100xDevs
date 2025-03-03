const fs = require('fs');

function solution(){
    fs.readFile("01-async-js/easy/sample.txt", 'utf-8', function(err, data){
        console.log(data);
    })
}

async function main_function(){
    let p1 = new Promise(function(resolve){
        setTimeout(function(){
            resolve('Hi from main function');
        }, 2000);
    });

    let p2 = new Promise(function(resolve){
        setTimeout(function(){
            resolve('Hi from main function');
        }, 1000);
    });

    let value1 = await p1;
    console.log(value1)
    let value2 = await p2;
    console.log(value1 + " " + value2);
    console.log("Hi from main function 2");
}

main_function();
console.log("Hi there");