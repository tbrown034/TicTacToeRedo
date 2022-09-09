//// State ----> Setting up the Game Loop
const state = {};
const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", ""]
    state.players = [", "]
    state.currentPlayer = "x";
    state.gameActive = true;
    document.getElementById("currentTurn").innerHTML = "";
    winMessageElement.innerText = "";
    document.getElementById("drawMessage").innerText = "";
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}

//// Dom Selector ----> grabbing elements
const boardElement = document.getElementById('board');
const playComputerButton = document.getElementById("playComputer");
const playHumanButton = document.getElementById("playHuman");
const resetButton = document.getElementById("resetButton")
const resetOptionsButton = document.getElementById("resetOptions")
const vsHumanElement = document.getElementById("vsHuman");
const vsComputerElement = document.getElementById("vsComputer");
const currentTurnElement = document.getElementById("currentTurn")
const winMessageElement = document.getElementById("winMessage")
const playerNames = document.getElementById("vsHumanForm").value;
//// Dom Manipulators ----> rendering
// Logic: Create board, loop through, create cells (via divs), add classList to those cells (to be able to style). Set innerHTML on the cell element to const square, which goes to state.board and uses the index to tell where the cell is at  ... also added dataset index(0-8). Finally, append the cells to the board. 
const renderBoard = () => {
      boardElement.innerHTML = '';
    for (let i = 0; i < state.board.length; i++) {
        const square = state.board[i];
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell')
        cellElement.innerHTML = square;
        cellElement.dataset.index = i;
        boardElement.appendChild(cellElement);
    }
}
//// Button Functions 
const playHumanClick = () => {
    if (vsHumanElement.style.display !== "block"){
    vsHumanElement.style.display = "block";}
}
const playComputerClick = () => {
    if (vsComputerElement.style.display !== "block"){
    vsComputerElement.style.display = "block";}
}
const resetOptionsClick = () => {
    if (vsComputerElement.style.display  === "block"){
        vsComputerElement.style.display = "none";}
    if (vsHumanElement.style.display  === "block"){
        vsHumanElement.style.display = "none";}
      }

// Helper Functions
function displayPlayersFunction () {
    let player1Name = document.getElementById("enterPlayer1").value;
    let player2Name = document.getElementById("enterPlayer2").value;
    document.getElementById("playerNames").innerText = `Welcome ${player1Name} and ${player2Name}!! Let's get ready to play! ${player1Name} will go first as X and ${player2Name} will go second as O. Good luck to you both!`}

function displayPlayerFunction () {
    let playerSoloName = document.getElementById("enterPlayerSolo").value;
    document.getElementById("playerName").innerText = `Welcome ${playerSoloName}!! Let's get ready to play! ${playerSoloName} will go first as X and the computer will go second as O. Good luck to you!`}

const resetTurnDisplay = () => {
        document.getElementById("currentTurn").innerHTML =
        ""
    }

const winningMessage = () => {

    let player1Name = document.getElementById("enterPlayer1").value;
    let player2Name = document.getElementById("enterPlayer2").value;
    if (state.currentPlayer === 'x') {
        document.getElementById("winMessage").innerText =
    `We have a winner! And our winner is ${player1Name}, playing as ${state.currentPlayer}!!`
    }
    else { document.getElementById("winMessage").innerText =
    `We have a winner! And our winner is ${player2Name}, playing as ${state.currentPlayer}!!`
    
     }
}

const drawMessage = () => {
    (resetTurnDisplay);
      document.getElementById("drawMessage").innerText =
 `No one win or loses. Draw game.`;}




////////////// win conditions ////////////////
// const xWinCombos = [
// ["x", "x", "x", "", "", "", "", "", ""], [0, 1 ,2]
// ["", "", "", "x", "x", "x", "", "", ""], [3, 4, 5]
// ["", "", "", "", "", "", "x", "x", "x"], [6, 7, 8]
// ["x", "", "", "x", "", "", "x", "", ""], [0, 3, 6]
// ["", "x", "", "", "x", "", "", "", "x"], [1, 4, 7]
// ["", "", "x", "", "", "x", "", "", "x"], [2, 5, 8]
// ["x", "", "", "", "x", "", "x", "", ""], [0, 4, 8]
// ["", "x", "", "x", "", "x", "", "", ""]] [2, 4, 6]

// const oWinCombos = [
// ["o", "o", "o", "", "", "", "", "", ""], [0, 1 ,2]
// ["", "", "", "o", "o", "o", "", "", ""], [3, 4, 5]
// ["", "", "", "", "", "", "o", "o", "o"], [6, 7, 8]
// ["o", "", "", "o", "", "", "o", "", ""], [0, 3, 6]
// ["", "o", "", "", "o", "", "", "", "o"], [1, 4, 7]
// ["", "", "o", "", "", "o", "", "", "0"], [2, 5, 8]
// ["o", "", "", "", "o", "", "o", "", ""], [0, 4, 8]
// ["", "o", "", "o", "", "o", "", "", ""] [2, 4, 6]
// ]

// Check Win logic: WinCombos (an array of arrays) are the results of the winning conditions: 3 row, 3 columns, 2 diagnoals. In winCheck i loop through my state.board to check if the current state is equal to one of those conditions (winningcondition[i] representing 0-7 of the win conditions). Example: if we do i=2, we would be checking if Xs or 0s hit the [6, 7, 8] (the bottom row), if so, current player is the winner. I then assign three new variable (SpotA, SpotB, SpotC) that represent the winning spots (index) in the winning condition. If they hit all three that means, current player is the winner. Since [0,1,2] represents i=0 that's what we start with and then it will iteriate over the other solutions as i++ (increments).

const winCombos = [
    //rows wins
	[0, 1, 2], // winningCondition[0]
	[3, 4, 5], // winningCondition[1]
	[6, 7, 8], // winningCondition[2]
    // columns wins
	[0, 3, 6], // winningCondition[3]
	[1, 4, 7], // winningCondition[4]
	[2, 5, 8], // winningCondition[5]
    // diagnoals wins
	[0, 4, 8], // winningCondition[6]
	[2, 4, 6] // winningCondition[7]
]

const winCheck = () => {
    let isWin = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winCombos[i];
        let spotA = state.board[winCondition[0]];
        let spotB = state.board[winCondition[1]];
        let spotC = state.board[winCondition[2]];
        // if either are the spots are empty, we contiune since no winners
        if (spotA === '' || spotB === '' || spotC === '') { 
            continue;
        }
        if (spotA === spotB && spotB === spotC ) {
            document.getElementById("currentTurn").innerText =
            "";
            isWin = true;
            console.log("is it a winner?", isWin, "is the game active?", state.gameActive);
            break 
        }
    }
    if (isWin) {
        winningMessage();
        state.gameActive = false;
        return;
    }
    let isDraw = !state.board.includes("");
    if (isDraw) {
        drawMessage();
        state.gameActive = false;
        return
    }

}

//// Board event listener
// Logic: 1. If click on board (return if already filled or if click outside of a cell).
// 2. get cellIndex to be unique on the cell elements.
// 3. Place marks and switch placers
// 4. Render so it displays with new state changes 
boardElement.addEventListener('click', (event) => {
    let player1Name = document.getElementById("enterPlayer1").value;
    let player2Name = document.getElementById("enterPlayer2").value;
    if (event.target.className !== 'cell') return;
    if (event.target.innerHTML == 'x' || event.target.innerHTML == 'o'){
        return;}
    let cellIndex = event.target.dataset.index;
    state.board[cellIndex] = state.currentPlayer;
    if (!state.gameActive) {        
        return}; // if gameActive is false, someone has won, so no more clickable cells
    winCheck();
    if(state.currentPlayer === 'x') {
    state.currentPlayer = 'o'}
    else {state.currentPlayer = 'x'};
    if(state.currentPlayer === 'x') { 
        currentTurnElement.innerHTML = `${player1Name}, playing as ${state.currentPlayer}, will go next!`}
        else {
            currentTurnElement.innerHTML = `${player2Name}, playing as ${state.currentPlayer}, will go next!`}
    renderBoard();
  }
)
//// Button event listners
playHumanButton.addEventListener("click", playHumanClick);
playComputerButton.addEventListener("click", playComputerClick);
resetButton.addEventListener("click", resetState);
resetOptionsButton.addEventListener("click", resetOptionsClick);
//// Bootstrapping ----> Need to call(invoke) formulas
resetState();
renderBoard();


