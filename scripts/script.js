let initialized = false;
let workTime = 1500, pauseTime = 300;
let workMode = true;
let interval;
let playing = false;

eventListeners();
document.querySelector(".bannerText").innerHTML = "focus timer";

// add event listeners to all buttons
function eventListeners() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            clicked(button);
        })
    })
}

// define button functions
function clicked(button) {
    let buttonName = button.name;
    
    switch(buttonName) {

        case 'play':
            if (playing == false) {
                interval = setInterval(play, 1000);
                playing = true;}
            break;
        case 'pause':
            clearInterval(interval);
            playing = false;
            document.querySelector(".bannerText").innerHTML = "pause";
            break;
         case 'stop':
            playing = false;
            clearInterval(interval);
            workTime = parseInt(document.querySelector('.workTime').innerHTML) * 60;
            workMode = true;
            updateDisplay(workTime);
            document.querySelector(".bannerText").innerHTML = "focus timer";
            break;
        case 'lesswork':
           if (workTime > 60 ) { document.querySelector('.workTime').innerHTML =  parseInt(document.querySelector('.workTime').innerHTML) - 1;
            workTime-= 60;
            updateDisplay(workTime);}
            break;
        case 'morework':
            document.querySelector('.workTime').innerHTML =  parseInt(document.querySelector('.workTime').innerHTML) + 1;
            workTime += 60;
            updateDisplay(workTime);
            break;
        case 'lesspause':
           if (pauseTime > 60) {document.querySelector('.pauseTime').innerHTML =  parseInt(document.querySelector('.pauseTime').innerHTML) - 1;
            pauseTime -= 60;}
            break;
        case 'morepause':
           document.querySelector('.pauseTime').innerHTML =  parseInt(document.querySelector('.pauseTime').innerHTML) + 1;
            pauseTime += 60;
            break;
    }
}


// convert seconds to mm:ss
function secondsDisplay(seconds) {
    let minute = Math.floor(seconds/60);
    let second = seconds - 60 * minute;
    return minute + ":" + (second < 10 ? "0" + second : second);
}

// update the countdown display
function updateDisplay(time) {
    document.querySelector('.time').innerHTML = secondsDisplay(time);
}

// play
function play() {
    if (workTime == 0) {
        workMode = false;
        workTime = parseInt(document.querySelector('.workTime').innerHTML) * 60;
    }
    if (pauseTime == 0) {
        workMode = true;
        pauseTime = parseInt(document.querySelector('.pauseTime').innerHTML) * 60;
    }
    if (workMode) {
    workTime--;
    updateDisplay(workTime);
    document.querySelector(".bannerText").innerHTML = "work";}
    else {
        pauseTime--;
        updateDisplay(pauseTime);
        document.querySelector(".bannerText").innerHTML = "break";
    }
}

