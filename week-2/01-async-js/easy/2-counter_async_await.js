function counter(count){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(count);
        }, 1000)
    })
}

async function main_counter(){
    let count = 0;
    while(true){
        let p = await counter(count);
        console.log(p);
        count++;
    }
}

main_counter();