let container = document.getElementById("container")
let mistakesSpan = document.getElementById("mistakes-made")
let progressSpan = document.getElementById("current-progress")
let timeSpan = document.getElementById("elapsed-time")

let resultModal = document.getElementById("result-modal")
let resultChars = document.getElementById("result-characters")
let resultTime = document.getElementById("result-time")
let resultTempo = document.getElementById("result-tempo")
let resultTypos = document.getElementById("result-typos")
let buttonRestart = document.getElementById("try-again")

let textsToTrain = []

let randomText
let paragraph
let mistakes
let spans
let position
let progress
let now
let elapsedTime

const fetchTexts = async () => {
    const response = await fetch('./quotes.json')
    const quotes = await response.json()
    const texts = quotes.quotes.map(x => x.quote)
    textsToTrain = texts
}

const initScript = async () => {
    randomText = textsToTrain[Math.floor(Math.random() *  textsToTrain.length)]
    paragraph = document.createElement("p")
    
    for(let c of randomText){
        let span = document.createElement("span")
        span.textContent = c
        paragraph.appendChild(span)
    }

    // remove previous Paragraphs
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.appendChild(paragraph)
    
    spans = document.querySelectorAll("#container > p > span")
    position = 0
    spans[position].classList.add("current")
    
    // init MISTAKES, PROGRESS, TIME
    mistakes = 0;
    mistakesSpan.textContent = mistakes
    
    progress = position  + " / " + (randomText.length - 1)
    progressSpan.textContent = progress
    
    now = new Date()
    
    elapsedTime = setInterval(function(){
        timeDifference = new Date(new Date().getTime() - now.getTime())
    
        timeSpan.textContent = ("0" + timeDifference.getUTCHours()).slice(-2) + ":" + ("0" + timeDifference.getUTCMinutes()).slice(-2) + ":" + ("0" + timeDifference.getUTCSeconds()).slice(-2)
    }, 1000)
}

// invoke loading of the file and initialize app once
(async () => {
    await fetchTexts()
    await initScript()
})()

document.addEventListener("keypress", function(event){
    if(position >= randomText.length){
        return
    }

    if((randomText[position] == " " && spans[position].textContent == "_" && event.key == " ") || (spans[position].textContent == event.key)){
        spans[position].classList.add("correct")
        spans[position].classList.remove("current")
    }
    else {
        spans[position].classList.add("wrong")
        spans[position].classList.remove("current")
        mistakes++;
        mistakesSpan.textContent = mistakes
    }
    
    if(spans[position].textContent == "_"){
        spans[position].textContent = " "
    }
    position++;

    if(position == randomText.length){
        clearInterval(elapsedTime)

        // update MODAL with results
        resultChars.textContent = randomText.length - 1
        resultTime.textContent = Math.round(timeDifference.getTime() / 1000)
        resultTempo.textContent = Math.round((randomText.length - 1) / (timeDifference.getTime() / 1000) * 60)
        resultTypos.textContent = mistakes
        resultModal.style.display = "flex"

        return
    }

    spans[position].classList.add("current")
    if(spans[position].textContent == " "){
        spans[position].textContent = "_"
    }

    progress = position  + " / " + (randomText.length - 1)
    progressSpan.textContent = progress
})

buttonRestart.addEventListener("click", function(event){
    resultModal.style.display = "none"
    initScript()
})
