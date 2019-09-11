//
const currentTimerVal = document.getElementById('current_timer');

//Break selectors
const breakTimer = document.getElementById('break_interval');

const breakMinus = document.getElementById('break_minus');
const breakPlus = document.getElementById('break_plus');

//SessionSelectors
const sessionTimer = document.getElementById('session_interval');
const sessionStatus = document.getElementById('current_status');
const sessionPlus = document.getElementById('session_plus');
const sessionMinus = document.getElementById('session_minus');

// Button
const reset = document.getElementById('controls_reset');
const pause = document.getElementById('controls_pause');
const start = document.getElementById('controls_start');
const stop = document.getElementById('controls_stop');

//reset UI on load
let currentStatusVal = "STOPPED";
let isSession = true;
let remainingSeconds = sessionTimer.textContent * 60;
let minutes = 25;
let seconds = 0;
let sessionFinished = 0;
let currentIntervalTimer;
let inSession = false;
resetUI();

function resetUI(){  
    if (currentIntervalTimer) {
      clearInterval(currentIntervalTimer);
      currentIntervalTimer = null;
    }
    breakTimer.textContent = 5;
    sessionTimer.textContent = 25;
    
    sessionStatus.textContent = 'STOPPED';
    sessionStatus.className="stopped"
    currentTimerVal.textContent = "25:00"
    remainingSeconds = sessionTimer.textContent * 60;
    isSession = true;
}
function stopSession(){  
    if (currentIntervalTimer) {
      clearInterval(currentIntervalTimer);
      currentIntervalTimer = null;
    }
    sessionStatus.textContent = 'STOPPED';
    sessionStatus.className="stopped"
    currentTimerVal.textContent = sessionTimer.textContent  + ":00"
    remainingSeconds = sessionTimer.textContent * 60;
    isSession = true;
}
function pauseSession(){
    
    if (currentIntervalTimer) {
      clearInterval(currentIntervalTimer);
      currentIntervalTimer = null;
      currentStatusVal = "PAUSED";
      sessionStatus.className="stopped"
      sessionStatus.textContent = currentStatusVal;
    }
}
function startSession(){
    if (currentIntervalTimer) {
      return;
    }
    if (isSession) {
        currentStatusVal = "IN SESSION";
        sessionStatus.className="session"
    } else {
        currentStatusVal = "BREAK";
        sessionStatus.className="break"
    }
    sessionStatus.textContent = currentStatusVal;
    
    currentIntervalTimer = setInterval(function () {
        minutes = parseInt(remainingSeconds / 60, 10);
        seconds = parseInt(remainingSeconds % 60, 10);
        //format string and pad
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        currentTimerVal.textContent = minutes + ":" + seconds;
        
        if (remainingSeconds === 0) {
            switch (currentStatusVal) {
              case "IN SESSION":
                currentStatusVal = "BREAK"
                sessionStatus.className="break"
                isSession = false;
                sessionStatus.textContent = currentStatusVal;
                remainingSeconds = sessionTimer.textContent * 60;
                break;
              default:
                currentStatusVal = "IN SESSION"
                sessionStatus.className="session"
                isSession = true;
                sessionStatus.textContent = currentStatusVal;
                remainingSeconds = breakTimer.textContent * 60;
            }
          } else {
            remainingSeconds--;
          }
        }, 1000);
    }
        

function breakTimerUpdate(val){
    console.log(breakTimer)
    if (parseInt(breakTimer.textContent) > 1) {
        breakTimer.textContent = parseInt(breakTimer.innerHTML) + val
    }
}
function sessionTimerUpdate(val){
    if (parseInt(sessionTimer.textContent) > 1) {
        sessionTimer.textContent = parseInt(sessionTimer.textContent) + val
        remainingSeconds = sessionTimer.textContent * 60;
        currentTimerVal.textContent = sessionTimer.textContent < 10 ? "0" + sessionTimer.textContent + ':00': sessionTimer.textContent + ':00';
    }
}
//Button Clicks
breakMinus.addEventListener('click', function() {
    console.log(breakMinus.textContent);
    if (!inSession){
        breakTimerUpdate(-1);
    }
});

breakPlus.addEventListener('click', function() {
    console.log(breakPlus.textContent);
    if (!inSession){
        breakTimerUpdate(1);
    }
});

sessionMinus.addEventListener('click', function() {
    console.log(sessionMinus.textContent);
    if (!inSession){
        sessionTimerUpdate(-1);
    }
});

sessionPlus.addEventListener('click', function() {
    console.log(sessionPlus.textContent);
    if (!inSession){
        sessionTimerUpdate(1);
    }
});


start.addEventListener('click', function() {
    console.log('play UI');
    inSession = true;
    startSession();
});
pause.addEventListener('click', function() {
    console.log('Pause UI');
    pauseSession();
});
reset.addEventListener('click', function() {
    console.log('Reset UI');
    inSession = false;
    resetUI();
});
stop.addEventListener('click', function() {
    console.log('Stop UI');
    inSession = false;
    stopSession();
});