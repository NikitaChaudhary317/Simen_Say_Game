let gameSequence = [];
let userSequence = [];

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;

let h2 = document.querySelector("#status");

let startBtn = document.querySelector("#start");
let resetBtn = document.querySelector("#reset");

/* ================= START GAME ================= */

startBtn.addEventListener("click", function(){

    if(started === false){

        started = true;
        level = 0;
        gameSequence = [];

        levelUp();
    }

});

/* ================= LEVEL UP ================= */

function levelUp(){

    userSequence = [];

    level++;

    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);

    let randomColor = btns[randomIndex];

    let randomBtn = document.querySelector(`#${randomColor}`);

    gameSequence.push(randomColor);

    gameFlash(randomBtn);

    console.log(gameSequence);
}

/* ================= GAME FLASH ================= */

function gameFlash(btn){

    btn.classList.add("flash");

    setTimeout(function(){

        btn.classList.remove("flash");

    },500);
}

/* ================= USER FLASH ================= */

function userFlash(btn){

    btn.classList.add("userflash");

    setTimeout(function(){

        btn.classList.remove("userflash");

    }, 300);
}

/* ================= BUTTON PRESS ================= */

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns){

    btn.addEventListener("click", buttonPress);
}

function buttonPress(){

    if(!started){
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSequence.push(userColor);

    checkAnswer(userSequence.length - 1);
}

/* ================= CHECK ANSWER ================= */

function checkAnswer(index){

    if(userSequence[index] === gameSequence[index]){

        if(userSequence.length === gameSequence.length){

            setTimeout(levelUp, 1000);
        }

    }else{

        h2.innerHTML = `Game Over!<br>Score : ${level - 1}`;

        document.body.classList.add("game-over");

        setTimeout(function(){

            document.body.classList.remove("game-over");

        }, 500);

        resetGame();
    }
}

/* ================= RESET GAME ================= */

function resetGame(){

    started = false;

    gameSequence = [];

    userSequence = [];

    level = 0;
}

/* ================= RESET BUTTON ================= */

resetBtn.addEventListener("click", function(){

    resetGame();

    h2.innerText = "Tap START to begin";

});