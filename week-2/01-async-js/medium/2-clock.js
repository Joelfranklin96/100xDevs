function solution(hr,min,sec){
    setTimeout(function(){
        console.log(String(hr) + ":" + String(min) + ":" + String(sec))
        sec++;
        if (sec>=60){
            min++;
            sec = 0;
        }
        if (min>= 60){
            hr++;
            min = 0;
        }
        if (hr>=24){
            hr = 0;
        }
        solution(hr, min, sec);
    }, 1000);
}

solution(0,0,0);