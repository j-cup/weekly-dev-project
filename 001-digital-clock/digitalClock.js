let numbersMatrix = [
    "111101101101111",
    "010010010010010",
    "111001111100111",
    "111001111001111",
    "101101111001001",
    "111100111001111",
    "111100111101111",
    "111001001001001",
    "111101111101111",
    "111101111001111"
]

let separator = "000010000010000"

let now = new Date()
let hours = now.getHours()
let minutes = now.getMinutes()
let seconds = now.getSeconds()

const clockContainer = document.getElementById("digital-clock")

// create DIGITS 
for(let d = 0; d <= 7; d++){
    let digit = document.createElement("div")
    digit.classList.add("digit")

    let range

    // if we create SEPARATOR
    if(d == 2 || d == 5 ){
        range = separator
        digit.classList.add("separator")
    }
    // or create a digit
    else {
        range = numbersMatrix[0]
    }

    for(c = 0; c < range.length; c++){
        let cell = document.createElement("div")
        range[c] == "1" ? cell.classList.add("cell", "active") : cell.classList.add("cell")
        digit.appendChild(cell)
    }
    clockContainer.appendChild(digit)
}

let digits = document.querySelectorAll(".digit:not(.separator)")

let digitalClock = setInterval(function(){
    let now = new Date();

    if(now.getHours() != hours || now.getMinutes() != minutes || now.getSeconds() != seconds){
        hours = now.getHours()
        minutes = now.getMinutes()
        seconds = now.getSeconds()
        const newDigits = ("0" + hours).slice(-2) + ("0" + minutes).slice(-2) + ("0" + seconds).slice(-2)

        for(let i=0; i < digits.length; i++){
            let newDigit = newDigits[i]
            let cells = digits[i].querySelectorAll(".cell")

            for(let x = 0; x < cells.length; x++){
                if(numbersMatrix[newDigit][x] == "1"){
                    cells[x].classList.add("active")
                }
                else {
                    cells[x].classList.remove("active")
                }
            }
        }
    }
}, 50)
