function counter(count){
    setTimeout(function(){
        console.log(count);
        count++;
        counter(count);
    }, 1000)
}

counter(0);