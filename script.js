let milliseconds = 0
let seconds = 0
let minutes = 0
let hours = 0
let count = 0
let cron
let cdSeconds = 0
let cdMinutes = 0
let cdHours = 0
let cdCron
let pomoSeconds = 0
let pomoMinutesWork = 25
let pomoMinutesShort = 5
let pomoMinutesLong = 15
let pomoCron
let audio = new Audio("alarmSound.mp3")

function chronometer() {
    if((milliseconds += 1) == 100) {
        milliseconds = 0
        seconds++
    }
    if(seconds == 60) {
        seconds = 0
        minutes++
    }
    if(minutes == 60) {
        minutes = 0
        hours++
    }
    document.getElementById("milliseconds").innerText = returnValues(milliseconds)
    document.getElementById("seconds").innerText = returnValues(seconds)
    document.getElementById("minutes").innerText = returnValues(minutes)
    document.getElementById("hours").innerText = returnValues(hours)
}

function timerStartStop() {
    buttonStartStop = document.getElementById("startStop")
    if(buttonStartStop.value == "Start") {
        buttonStartStop.setAttribute("value", "Stop")
        cron = setInterval(function() {chronometer()}, 10)
    } else {
        buttonStartStop.setAttribute("value", "Start")
        clearInterval(cron)
    }
}

function returnValues(input) {
    let value
    if(input < 10 && input > -1) {
      value = `0${input}`
      return(value)
    } else {
      return(input)
    }
}

function timerReset() {
    milliseconds = 0
    seconds = 0
    minutes = 0
    hours = 0
    document.getElementById("milliseconds").innerText = "00"
    document.getElementById("seconds").innerText = "00"
    document.getElementById("minutes").innerText = "00"
    document.getElementById("hours").innerText = "00"

    buttonStartStop = document.getElementById("startStop")
    if(buttonStartStop.value == "Stop") {
        buttonStartStop.setAttribute("value", "Start")
        clearInterval(cron)
    }

    document.getElementById("lap").textContent = ""
    count = 0
}

function lap() {
    if(hours != 0 || minutes != 0 || seconds != 0 || milliseconds != 0) {
        count ++
        let lapDiv = document.getElementById("lap")
        let lapLabel = document.createTextNode(`${"Lap "}${count} - ${returnValues(hours)}:${returnValues(minutes)}:${returnValues(seconds)}:${returnValues(milliseconds)}`)
        let br = document.createElement("br")
        lapDiv.insertBefore(lapLabel, lapDiv.firstChild)
        lapDiv.insertBefore(br, lapDiv.firstChild)
    }
}

function countDown() {
    cdSeconds--
    if(cdSeconds == 0 && cdMinutes == 0 && cdHours == 0) {
        countdownReset()
        audio.play()
    }
    if(cdSeconds == -1) {
        cdSeconds = 59
        cdMinutes--
        if(cdMinutes == -1) {
            cdHours--
            cdMinutes = 59
        }
    }

    document.getElementById("hours").innerText = returnValues(cdHours)
    document.getElementById("minutes").innerText = returnValues(cdMinutes)
    document.getElementById("seconds").innerText = returnValues(cdSeconds)
}

function countdownStartStop() {
    cdHours = parseInt(document.getElementById("inputHours").value)
    cdMinutes = parseInt(document.getElementById("inputMinutes").value)
    cdSeconds = parseInt(document.getElementById("inputSeconds").value)
    document.getElementById("inputSeconds").value = ""
    document.getElementById("inputMinutes").value = ""
    document.getElementById("inputHours").value = ""

    if(isNaN(cdHours)) {
        cdHours = 0
    }
    if(isNaN(cdMinutes)) {
        cdMinutes = 0
    }
    if(isNaN(cdSeconds)) {
        cdSeconds = 0
    }

    if(cdHours != 0 || cdMinutes != 0 || cdSeconds != 0) {
        if(cdSeconds > 60) {
            let floorDivision = Math.floor(cdSeconds / 60)
            cdSeconds %= 60
            cdMinutes += floorDivision
        }
        if(cdMinutes > 60) {
            let floorDivision = Math.floor(cdMinutes / 60)
            cdMinutes %= 60
            cdHours += floorDivision
        }
        if(cdHours > 99) {
            alert("The number of hours can not exceed 99. Try again!")
            countdownReset()
        } else {
            document.getElementById("hours").innerText = returnValues(cdHours)
            document.getElementById("minutes").innerText = returnValues(cdMinutes)
            document.getElementById("seconds").innerText = returnValues(cdSeconds)
            cdCron = setInterval(function() {countDown()}, 1000)
        }
    } else {
        countdownReset()
        alert("No time value has been entered. Try again!")
    }
}

function countdownReset() {
    document.getElementById("inputSeconds").value = ""
    document.getElementById("inputMinutes").value = ""
    document.getElementById("inputHours").value = ""
    cdSeconds = 0
    cdMinutes = 0
    cdHours = 0
    document.getElementById("seconds").innerText = "00"
    document.getElementById("minutes").innerText = "00"
    document.getElementById("hours").innerText = "00"
    clearInterval(cdCron)
}

function pomodoroWork() {
    pomoSeconds--
    if(pomoSeconds == 0 && pomoMinutesWork == 0) {
        pomodoroResetLong()
        audio.play()
    }
    if(pomoSeconds == -1) {
        pomoSeconds = 59
        pomoMinutesWork--
    }
    document.getElementById("seconds").innerText = returnValues(pomoSeconds)
    document.getElementById("minutes").innerText = returnValues(pomoMinutesWork)
}

function pomodoroShort() {
    pomoSeconds--
    if(pomoSeconds == 0 && pomoMinutesShort == 0) {
        pomodoroResetLong()
        audio.play()
    }
    if(pomoSeconds == -1) {
        pomoSeconds = 59
        pomoMinutesShort--
    }
    document.getElementById("seconds").innerText = returnValues(pomoSeconds)
    document.getElementById("minutes").innerText = returnValues(pomoMinutesShort)
}

function pomodoroLong() {
    pomoSeconds--
    if(pomoSeconds == 0 && pomoMinutesLong == 0) {
        pomodoroResetLong()
        audio.play()
    }
    if(pomoSeconds == -1) {
        pomoSeconds = 59
        pomoMinutesLong--
    }
    document.getElementById("seconds").innerText = returnValues(pomoSeconds)
    document.getElementById("minutes").innerText = returnValues(pomoMinutesLong)
}

function pomoStart() {
    pomoMinutesLong = 15
    pomoMinutesShort = 5
    pomoMinutesWork = 25
    pomoSeconds = 0
    pomodoroResetLong()
    pomodoroResetShort()
    pomodoroResetWork()
    document.getElementById("minutes").innerText = "25"
    document.getElementById("seconds").innerText = "00"
    pomoCron = setInterval(function() {pomodoroWork()}, 1000)
}

function pomoStartShort() {
    pomoMinutesLong = 15
    pomoMinutesShort = 5
    pomoMinutesWork = 25
    pomoSeconds = 0
    pomodoroResetLong()
    pomodoroResetShort()
    pomodoroResetWork()
    document.getElementById("minutes").innerText = "05"
    document.getElementById("seconds").innerText = "00"
    pomoCron = setInterval(function() {pomodoroShort()}, 1000)
}

function pomoStartLong() {
    pomoMinutesLong = 15
    pomoMinutesShort = 5
    pomoMinutesWork = 25
    pomoSeconds = 0
    pomodoroResetLong()
    pomodoroResetShort()
    pomodoroResetWork()
    document.getElementById("minutes").innerText = "15"
    document.getElementById("seconds").innerText = "00"
    pomoCron = setInterval(function() {pomodoroLong()}, 1000)
}

function pomodoroResetWork() {
    document.getElementById("minutes").innerText = "25"
    document.getElementById("seconds").innerText = "00"
    clearInterval(pomoCron)
}

function pomodoroResetShort() {
    document.getElementById("minutes").innerText = "05"
    document.getElementById("seconds").innerText = "00"
    clearInterval(pomoCron)
}

function pomodoroResetLong() {
    document.getElementById("minutes").innerText = "15"
    document.getElementById("seconds").innerText = "00"
    clearInterval(pomoCron)
}