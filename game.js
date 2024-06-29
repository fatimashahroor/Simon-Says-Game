const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

function nextSequence() {
    gamePattern.push(buttonColors[randomColor()]);
    console.log(gamePattern);
}

function togglePressedClass () {
    var lastElement= gamePattern[gamePattern.length-1];
    var button=document.getElementById(lastElement);
    button.classList.toggle("pressed");
}

function playGame() {
    while (true) {
        for (var i=0; i<gamePattern.length; i++) {
            var lastElement= gamePattern[gamePattern.length-1];
            var button=document.getElementById(lastElement);
            var audio = new Audio(`../sounds/${lastElement}.mp3`);
            button.classList.add("pressed");
            audio.play();
            setTimeout( () => {togglePressedClass()}, 200);
        }
        break;
    }
} 

function randomColor() {
    return Math.floor(Math.random()*(buttonColors.length));
}

document.addEventListener('keypress', () => {
    if (!started) {
        console.log(document.querySelector("#level-title").textContent = `Level ${level}`)
        nextSequence();
        started = true
        playGame()
    }
})


