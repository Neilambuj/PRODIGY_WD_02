let timer;
let isRunning = false;
let startTime = 0;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (lapTimes.reduce((a, b) => a + b, 0) || 0);
        timer = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    lapTimes = [];
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapList = document.getElementById("laps");
        const lapItem = document.createElement("div");
        lapItem.textContent = formatTime(lapTime);
        lapList.prepend(lapItem);
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
