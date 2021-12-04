const countdownDisplayDays = document.getElementById("countdown-display-days")
const countdownDisplayHours = document.getElementById("countdown-display-hours")
const countdownDisplayMinutes = document.getElementById("countdown-display-minutes")
const countdownDisplaySeconds = document.getElementById("countdown-display-seconds")
const buttonTimeEl = document.getElementById("buttonTime-el")
const christmasMessage = document.getElementById("christmas-message")
const christmasMessageWarning = document.getElementById("christmas-message-warning")

buttonTimeEl.addEventListener("click", function(){
    renderCountDown()
})

function renderCountDown(){
    // null ca sa scot textul "grabit" de la masurarea anterioasa, ca poate acum userul nu e grabit :)
    christmasMessage.innerHTML = null
    christmasMessageWarning.innerHTML = null 

    let warningText = `Santa can see <span style="color:red;"> your impatience </span> !`
    let minuteText = "minutes"
    const nowTime = new Date()
    const nowYear = nowTime.getFullYear()
    const christmasThisYear = new Date(nowYear + "-12-25T00:00:00") 
    const differenceInMiliseconds = christmasThisYear - nowTime

    const oldTime = localStorage.getItem("oldTimeValue") 
    const oldTimeObject = new Date(oldTime)
    localStorage.setItem("oldTimeValue", nowTime)
    const differenceInMilisecondsImpatience = nowTime - oldTimeObject   
    
    let impatienceSeconds = differenceInMilisecondsImpatience / 1000
    const impatienceMinutes = Math.floor(impatienceSeconds / 60)
    impatienceSeconds = Math.floor(impatienceSeconds - (impatienceMinutes * 60) )
    
    if (impatienceMinutes === 1) {
        minuteText = "minute"
    }

    if (impatienceMinutes < 5) {
        christmasMessage.innerHTML = "Warning !"
        christmasMessageWarning.innerHTML = `You checked the Christmas counter <br> ${impatienceMinutes} ${minuteText} and ${impatienceSeconds} seconds ago, <br> ${warningText}` 
    }
 
    const daysLeftPointSome = differenceInMiliseconds / (1000 * 3600 * 24) //zile cu virgula
    const daysLeft = Math.floor(daysLeftPointSome) // zile ramase
    countdownDisplayDays.innerText = daysLeft 
    
    const pointSomeDay = daysLeftPointSome - daysLeft // sub o zi
    const hoursLeftPointSome = (pointSomeDay * 24) 
    const hoursLeft = Math.floor(hoursLeftPointSome) // ore ramase
    countdownDisplayHours.innerText = hoursLeft
    
    const pointSomeHours =  hoursLeftPointSome - hoursLeft // sub o ora
    const minutesLeftPointSome = pointSomeHours * 60
    const minutesLeft = Math.floor(minutesLeftPointSome) // minute ramase
    countdownDisplayMinutes.innerText = minutesLeft

    const secondsLeft = Math.floor((minutesLeftPointSome - minutesLeft) * 60) // secunde ramase
    countdownDisplaySeconds.innerText = secondsLeft 
    
    if(differenceInMiliseconds < 0 ){
         countdownDisplayDays.innerText = 0
         countdownDisplayHours.innerText = 0
         countdownDisplayMinutes.innerText = 0
         countdownDisplaySeconds.innerText = 0 
         christmasMessage.innerText = "Merry Christmas !"
         christmasMessageWarning.innerText = null
    }
}

// Stretch goals:
// - Display days, hours, minutes, seconds.
// - Add a countdown for another festival, your birthday, or Christmas.
