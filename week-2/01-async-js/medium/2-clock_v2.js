function solution(hr,min,sec){
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
    setTimeout(solution,1000,hr,min,sec)
}

solution(0,0,0);