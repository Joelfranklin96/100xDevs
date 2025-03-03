function main_counter(count){
    let p = new Promise(function(resolve){
        setTimeout(function(){
            resolve(count);
        }, 1000)});
    p.then(function(data){
        console.log(data);
        count++;
        main_counter(count);
    })
}
count = 0;
main_counter(count);