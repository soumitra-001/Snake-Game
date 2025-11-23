const board = document.querySelector('.board');
let startButton = document.querySelector('.btn-start');
let btnRestart = document.querySelector('.btn-restart');
let modal = document.querySelector('.modal');
let startGame = document.querySelector('.start-game');
let gameOver = document.querySelector('.game-over');

let highScoreElement = document.querySelector('#highScore');
let scoreElement = document.querySelector('#score');
let timerElement = document.querySelector('#timer');

const blockHeight = 50;
const blockwidth = 50;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;

highScoreElement.innerHTML = `High Score : ${highScore}`;

let cols = Math.floor(board.clientWidth / blockwidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timerInterval = null;
let seconds = 0;

let blocks = {};
let snake;
let direction;
let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
};

// board setup
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${j},${i}`] = block;
    }
}

function initGame() {
    snake = [
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ];

    direction = "right";

    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };

    Object.values(blocks).forEach(b => {
        b.classList.remove("fill", "food");
    });

    snake.forEach(seg => blocks[`${seg.x},${seg.y}`].classList.add("fill"));
    score = 0;
    scoreElement.innerHTML = `Score : ${score}`;
}

function startTimer() {
    seconds = 0;
    timerElement.innerHTML = `Timer : 00:00`;

    timerInterval = setInterval(() => {
        seconds++;
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;

        timerElement.innerHTML = `Timer : ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function render() {
    blocks[`${food.x},${food.y}`].classList.add("food");

    let head;
    if (direction === "left") head = { x: snake[0].x - 1, y: snake[0].y };
    else if (direction === "right") head = { x: snake[0].x + 1, y: snake[0].y };
    else if (direction === "up") head = { x: snake[0].x, y: snake[0].y - 1 };
    else if (direction === "down") head = { x: snake[0].x, y: snake[0].y + 1 };

    // boundary collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        endGame();
        return;
    }

    // self collision
    if (snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) {
        endGame();
        return;
    }

    // food collision
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
        snake.unshift(head);

        score += 10;
        scoreElement.innerHTML = `Score : ${score}`;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
            highScoreElement.innerHTML = `High Score : ${highScore}`;
        }

    } else {
        snake.unshift(head);
        snake.pop();
    }

    Object.values(blocks).forEach(block => block.classList.remove("fill"));
    snake.forEach(seg => blocks[`${seg.x},${seg.y}`].classList.add("fill"));
}

function endGame() {
    modal.style.display = "flex";
    gameOver.style.display = "flex";
    clearInterval(intervalId);
    stopTimer();
}

startButton.addEventListener("click", () => {
    initGame();
    intervalId = setInterval(render, 300);
    startTimer();

    modal.style.display = "none";
    startGame.style.display = "none";
});

btnRestart.addEventListener("click", () => {
    initGame();
    intervalId = setInterval(render, 300);
    startTimer();

    modal.style.display = "none";
    gameOver.style.display = "none";
});

// Movement Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    else if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    else if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});
