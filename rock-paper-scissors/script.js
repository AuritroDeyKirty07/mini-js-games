const choices = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll("#choices button");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;
const WIN_LIMIT = 5;


const winMap = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        playGame(button.dataset.choice);
    });
});

function playGame(playerChoice) {

    if (playerScore === WIN_LIMIT || computerScore === WIN_LIMIT) return;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "IT'S A TIE";
    } else if (winMap[playerChoice] === computerChoice) {
        result = "YOU WIN!";
        playerScore++;
    } else {
        result = "YOU LOSE!";
        computerScore++;
    }

    updateUI(playerChoice, computerChoice, result);
    checkGameOver();
}

function updateUI(playerChoice, computerChoice, result) {
    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    if (result === "YOU WIN!") {
        resultDisplay.classList.add("greenText");
    } else if (result === "YOU LOSE!") {
        resultDisplay.classList.add("redText");
    }

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function checkGameOver() {
    if (playerScore === WIN_LIMIT) {
        resultDisplay.textContent = "YOU WON THE GAME!";
        disableButtons();
    } else if (computerScore === WIN_LIMIT) {
        resultDisplay.textContent = "COMPUTER WON THE GAME!";
        disableButtons();
    }
}

function disableButtons() {
    buttons.forEach(button => button.disabled = true);
}

function enableButtons() {
    buttons.forEach(button => button.disabled = false);
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;

    playerDisplay.textContent = "PLAYER: -";
    computerDisplay.textContent = "COMPUTER: -";
    resultDisplay.textContent = "First to 5 wins!";
    resultDisplay.classList.remove("greenText", "redText");

    enableButtons();
}