const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

function nextSequence() {
    gamePattern.push(buttonColors[randomColor()]);
    console.log(gamePattern);
    playGame();    
}

function togglePressedClass (pressedBtn) {
    var button=document.getElementById(pressedBtn);
    button.classList.toggle("pressed");
}

function playGame() {
    var lastElement= gamePattern[gamePattern.length-1];
    var button=document.getElementById(lastElement);
    var audio = new Audio(`../sounds/${lastElement}.mp3`);
    button.classList.add("pressed");
    console.log(button);
    audio.play();
    setTimeout( () => {togglePressedClass(lastElement)},100);
    $(".btn").click(function () {
        const userChosenColor = this.id;
        this.classList.add("pressed");
        new Audio (`../sounds/${userChosenColor}.mp3`).play();
        setTimeout( function() {togglePressedClass(userChosenColor)}, 100);
        console.log(userChosenColor);
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
        let answer= checkButton(userClickedPattern.length);
        console.log(answer);
        if (userClickedPattern.length == gamePattern.length && answer!= false) {
            userClickedPattern=[];
            level=level+1
            document.querySelector("#level-title").textContent = `Level ${level}`;
            $(".btn").unbind("click");
            setTimeout(nextSequence(), 2000);
            // in case we have two consecutive buttons with the same color
            if(gamePattern[gamePattern.length-1]==gamePattern[gamePattern.length-2] && gamePattern.length > 1)
                setTimeout( function() {togglePressedClass(userChosenColor)}, 50);

        }
    });
}


function checkButton(index) {
    if (gamePattern[index-1] != userClickedPattern[index-1]) {
        $("h1").text("Game Over, Press Any Key To Restart");
        $("body").addClass("game-over");
        let wrong = new Audio("../sounds/wrong.mp3");
        wrong.play();
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 100);
        gamePattern=[];
        userClickedPattern=[];
        $(".btn").unbind("click");
        level=0;
        started= false;
        return false;
    }
}

function randomColor() {
    return Math.floor(Math.random()*(buttonColors.length));
}

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true

    }
})


