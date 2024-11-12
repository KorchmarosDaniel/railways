import { GenerateTiles } from "./generate_tiles.js";
import { UpdateLeftClick, UpdateRightClick, CheckIfWon } from "./handle_clicks.js";

const startBtn = document.querySelector("#start-button");
const helpBtn = document.querySelector("#help-button");
const menuBtn = document.querySelector("#menu-button");
const saveBtn = document.querySelector("#save-button");
const loadBtn = document.querySelector("#load-button");
const nameInput = document.querySelector("#player-name-input");
const menuDiv = document.querySelector("#menu");
const gameDiv = document.querySelector("#game");
const helpDiv = document.querySelector("#help");
const statsDiv = document.querySelector("#stats-div");
const gameTable = document.querySelector("#game-table");
const leaderBoardDiv = document.querySelector("#leaderboard");
const gameWonDiv = document.querySelector("#game-won");
const saveDiv = document.querySelector("#save-div");
const nameOutputs = document.querySelectorAll("#player-name-output");
const levelOutputs = document.querySelectorAll("#level-output");
const finishedTimeOuput = document.querySelector("#time-output");
const timeOutput = document.querySelector("#elapsed-time-output");
const saveText = document.querySelector("#save-game-text");
const leaderBoardList = document.querySelector("#leaderboard-list");
let timerInterval;
let tiles;
let startTime;
let storedTime;
let elapsedTime;
let lakeTilesNum;
let stage;
let name;

startBtn.addEventListener("click", (e) => {
    StartGame(true);
});

loadBtn.addEventListener("click", (e) => {
    if (localStorage.getItem("storedGame") !== null) {
        StartGame(false);
    }
})

helpBtn.addEventListener("click", (e) => {
    menuDiv.style.display = "none";
    helpDiv.style.display = "block";
})

menuBtn.addEventListener("click", (e) => {
    helpDiv.style.display = "none";
    menuDiv.style.display = "block";
})

saveBtn.addEventListener("click", (e) => {
    saveText.style.visibility = "visible";
    localStorage.setItem("storedGame", JSON.stringify(tiles));
    localStorage.setItem("storedStage", stage);
    localStorage.setItem("storedName", name);
    localStorage.setItem("storedTime", elapsedTime);
    setTimeout(() => {
        saveText.style.visibility = "hidden";
    }, 1000)
})

function UpdateTimeSaved() {
    elapsedTime = Date.now() - startTime + storedTime;
    timeOutput.innerHTML = FormatTime(Math.floor(elapsedTime / 1000));
}

function UpdateTimeNew() {
    elapsedTime = Date.now() - startTime;
    timeOutput.innerHTML = FormatTime(Math.floor(elapsedTime / 1000));
}

function StartGame(isNewGame) {
    startTime = Date.now();
    name = nameInput.value === '' ? "The Nameless" : nameInput.value;
    let selectedDificulty = document.querySelector('input[name="difficulty-select"]:checked').value;
    menuDiv.style.display = "none";
    GenerateBoard(selectedDificulty, isNewGame);
    gameDiv.style.display = "block";
    if (isNewGame) {
        timerInterval = setInterval(UpdateTimeNew, 1000);
    } else {
        storedTime = parseInt(localStorage.getItem("storedTime"));
        timerInterval = setInterval(UpdateTimeSaved, 1000);
    }
}

function FormatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function GenerateBoard(difficulty, isNewGame) {
    let n;
    if (isNewGame) {
        const isHard = difficulty === "hard";
        n = isHard ? 7 : 5;
        let m = Math.floor(Math.random() * 5) + 1;
        stage = m;
        if (isHard) {
            m += 5;
        }
        tiles = GenerateTiles(m);
    } else {
        tiles = JSON.parse(localStorage.getItem("storedGame"));
        stage = parseInt(localStorage.getItem("storedStage"));
        name = localStorage.getItem("storedName");
        n = tiles.length;
    }
    nameOutputs.forEach(nameOutput => {
        nameOutput.innerHTML = name;
    });
    lakeTilesNum = CountLakeTiles(tiles, n);
    const table = document.createElement('table');
    table.classList.add(`table${n}`);
    for (let i = 0; i < n; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('td');
            cell.style.backgroundImage = `url('./img/bg/${tiles[i][j].type}.png')`
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    gameTable.appendChild(table);
}

function CountLakeTiles(tiles, n) {
    let s = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (tiles[i][j].type === 1) {
                s++;
            }
        }
    }
    return s;
}

gameTable.addEventListener("mousedown", (e) => {
    if (!e.target.matches("td")) {
        return;
    }  
    let yPos = e.target.parentNode.rowIndex;
    let xPos = e.target.cellIndex;
    if (e.button === 0) {
        UpdateLeftClick(yPos, xPos, tiles);
        if (CheckIfWon(yPos, xPos, tiles, lakeTilesNum)) {
            GameWon();
        }
    } else if (e.button === 2) {
        e.preventDefault();
        UpdateRightClick(yPos, xPos, tiles);
    }
    e.target.style.backgroundImage = `url('./img/bg/${tiles[yPos][xPos].type}.png')`
})

gameTable.addEventListener("contextmenu", (e) => {
    if (e.target.matches("td")) {
      e.preventDefault();
    }
})

function GameWon() {
    statsDiv.style.display = "none";
    gameTable.style.display = "none";
    saveDiv.style.display = "none";
    gameWonDiv.style.display = "block";
    leaderBoardDiv.style.display = "block";
    levelOutputs.forEach(levelOutput => {
        levelOutput.innerHTML = stage;
    });
    clearInterval(timerInterval);
    finishedTimeOuput.innerHTML = FormatTime(Math.floor(elapsedTime / 1000));
    CalculateLeaderBoard();
}

function CalculateLeaderBoard() {
    let stats = {name: name, time: Math.floor(elapsedTime / 1000)};
    console.log(stats);
    let currentLeaderBoard = localStorage.getItem(`level${stage}`) ;
    currentLeaderBoard = currentLeaderBoard ? JSON.parse(currentLeaderBoard) : [];
    currentLeaderBoard.push(stats);
    currentLeaderBoard.sort((a, b) => a.time - b.time);
    currentLeaderBoard = currentLeaderBoard.splice(0, 3);
   for(const player of currentLeaderBoard) {
        const li = document.createElement("li");
        li.innerHTML = `${player.name} - ${FormatTime(parseInt(player.time))}`;
        leaderBoardList.appendChild(li);
    }
    localStorage.setItem(`level${stage}`, JSON.stringify(currentLeaderBoard));
    localStorage.removeItem("storedGame");
    localStorage.removeItem("storedStage");
    localStorage.removeItem("storedName");
    localStorage.removeItem("storedTime");
}