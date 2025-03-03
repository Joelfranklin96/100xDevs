function counter(){
    let a = 0;
    setInterval(function(){
        console.log(a);
        a++;
    }, 1000)
}

counter();