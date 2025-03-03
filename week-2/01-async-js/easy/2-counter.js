function counter(count){
    console.log(count);
    count++;
    setTimeout(counter,1000,count);
}

counter(0);