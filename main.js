const scoreContainer = document.querySelector("[data-score-container]")
const timer = document.querySelector(".timer")
const greenRetakeBtn = document.querySelector("#greenRetake")
const resetTimerBtn = document.querySelector("#resetTimer")
const testContainer = document.querySelector(".testContainer")
const iconContainer = document.querySelector(".center-icon")
const rotateIcon = document.querySelector(".fa-rotate")
const wordArea = document.querySelector("[data-wordarea]")
const userInput = document.querySelector(".userInput")
const totalCorrect = document.querySelector(".totalCorrect")
const totalTypos = document.querySelector(".totalTypos")
const netWpm = document.querySelector(".netWpm")

let timerActive = false
let timerRestarted = false
let initialText = wordArea.innerText
let correctLetters = ""
let typos = ""
  

resetTimerBtn.addEventListener("click", () => {
  if(timerActive) timerRestarted = true
})

greenRetakeBtn.addEventListener("click", () => {
  scoreContainer.style.display = "none"
  testContainer.style.display = "block"
  timer.textContent = "01:00"
  userInput.disabled = false
})

userInput.addEventListener("input", () => {
  if(timerActive != true) {
    timerActive = true
    countdown()
  }
  textChecker()
})

function countdown() {
  let totalTime = 60
  let x = setInterval(() => {
    if(timerActive === true) {
      totalTime -= 1
      if (totalTime >= 10) {
        timer.innerHTML = `00:${totalTime}`
      } else if(totalTime > 0) {
        timer.innerHTML = `00:0${totalTime}`
      } else if(totalTime <= 0){
        timerActive = false
      }
    } else {
      clearInterval(x)
      stopTest()
      calcResults()
    }
    if (timerRestarted) {
      clearInterval(x)
      timer.textContent = "01:00"
      wordArea.innerText = initialText
      typos = ""
      timerActive = false
    }
  }, 1000)
}

function stopTest() {
  timer.innerHTML = "00:00"
  wordArea.innerText = initialText
  userInput.value = ""
  userInput.disabled = true
}

function calcResults() {
  testContainer.style.background = "#ccc"
  iconContainer.style.display = "block"
  rotateIcon.classList.add("rotating")
  setTimeout(() => {
    rotateIcon.classList.remove("rotating")
    iconContainer.style.display = "none"
    testContainer.style.background = "#fff"
    testContainer.style.display = "none"
    scoreContainer.style.display = "block"
  }, 1000)
  let wpm = Math.floor(correctLetters.length / 5)
  let clearCharacters = correctLetters.length - typos.length
  if(Number.isInteger(wpm)) {
    totalCorrect.innerText = wpm
  }
  totalTypos.textContent = typos.length
  if(clearCharacters >= 0) {
    netWpm.textContent = Math.floor((correctLetters.length - typos.length) / 5)
  }
}

function textChecker() {
   let userText = userInput.value
   correctLetters = ""
   let wrongLetter = ""
   let restText = ""
   let correctSpan = document.createElement("span")
   let restSpan = document.createElement("span")
   
   for (i = 0; i < userText.length; i++) {
     if ((userText[i] === initialText[i]) && (wrongLetter === "")) {
       correctLetters += userText[i]
       restText = initialText.slice(correctLetters.length)
       correctSpan.innerText = correctLetters
       correctSpan.style.color = "dodgerblue"
       restSpan.innerText = restText
       wordArea.innerHTML = `<span style="color: dodgerblue">${correctLetters}</span>${restText}`
       if ((userText.length === initialText.length) && (userText[userText.length - 1] === initialText[initialText.length - 1])) {
         timerActive = false
       }
     } else if (wrongLetter === "") {
       wrongLetter = initialText[i]
       typos += userText[userText.length-1]
       restText = initialText.slice(i + 1)
       wordArea.innerHTML = `<span style="color: dodgerblue">${correctLetters}</span><span style="background: red; color: white">${wrongLetter}</span>${restText}`
    }
  }
}

