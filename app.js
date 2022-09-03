////////////// initil state ----> Setting up the Game Loop
const state = {};
const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", ""]
    state.players = [", "]
    state.currentPlayer = "x";
    statusDisplay.innerHTML = "Current Turn: x will be going first";
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}


////////////// Dom Selector ----> grabbing elements
const boardElement = document.getElementById('board');
const playComputerButton = document.getElementById("playComputer");
const playHumanButton = document.getElementById("playHuman");
const resetButton = document.getElementById("resetButton")
const resetOptionsButton = document.getElementById("resetOptions")
const vsHumanElement = document.getElementById("vsHuman");
const vsComputerElement = document.getElementById("vsComputer");
// DOM Selectors Forms 
const playerNames = document.getElementById("vsHumanForm").value;
const player1Name = document.getElementById("enterPlayer1").value;
const player2Name = document.getElementById("enterPlayer2").value;
const playerSoloName = document.getElementById("enterPlayerSolo").value;
////////////// Dom Manipulators ----> rendering
//// Create board, loop through, create cells (via divs), add classList to those cells (to be able to style). Set innerHTML on the cell element to const square, which goes to state.board and uses the index to tell where the cell is at  ... also added dataset index(0-8). Finally, append the cells to the board. 
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
////////////// Button Functions //////////////
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
//////////////Name and Display Functions //////////////
function displayPlayersFunction () {
    let player1Name = document.getElementById("enterPlayer1").value;
    let player2Name = document.getElementById("enterPlayer2").value;
    document.getElementById("playerNames").innerText = "Welcome, " + player1Name + " and " + player2Name + "! Let's get ready to play! " + player1Name + " will go first as X. " + player2Name + " will go second as O. Good luck to you both!";
   }
function displayPlayerFunction () {
    let playerSoloName = document.getElementById("enterPlayerSolo").value;
    document.getElementById("playerName").innerText = "Welcome, " + playerSoloName + "! Let's get ready to play the computer! " + playerSoloName + " you'll be starting first as X. Good luck to you!";
   }
////////////// win conditions ////////////////

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const xWinCombos = [
["x", "x", "x", "", "", "", "", "", ""],
["", "", "", "x", "x", "x", "", "", ""],
["", "", "", "", "", "", "x", "x", "x"],
["x", "", "", "x", "", "", "x", "", ""],
["", "x", "", "", "x", "", "", "", "x"],
["", "", "x", "", "", "x", "", "", "x"],
["x", "", "", "", "x", "", "x", "", ""],
["", "x", "", "x", "", "x", "", "", ""]]

const oWinCombos = [
["o", "o", "o", "", "", "", "", "", ""],
["", "", "", "o", "o", "o", "", "", ""],
["", "", "", "", "", "", "o", "o", "o"],
["o", "", "", "o", "", "", "o", "", ""],
["", "o", "", "", "o", "", "", "", "o"],
["", "", "o", "", "", "o", "", "", ""],
["o", "", "", "", "o", "", "o", "", ""],
["", "o", "", "o", "", "o", "", "", ""]
]

const xWins = () => {

    
}

////////////// EventListeners - clickable cells //////////////
//// 1. If click on board (return if already filled or if click outside of a cell).
//// 2. get cellIndex to be unique on the cell elements.
//// 3. Place marks and switch placers
//// 4. Render so it displays with new state changes 
boardElement.addEventListener('click', (event) => {
    if (event.target.className !== 'cell') return;
    if (event.target.innerHTML == 'x' || event.target.innerHTML == 'o'){
        return;}
    let cellIndex = event.target.dataset.index;
    state.board[cellIndex] = state.currentPlayer;
    if(state.currentPlayer === 'x') {
    state.currentPlayer = 'o'}
    else {state.currentPlayer = 'x'};
    const currentPlayerTurn = () => `Current Turn: It is now ${state.currentPlayer}'s turn`;
    statusDisplay.innerHTML = currentPlayerTurn();
    renderBoard()
    console.log("cell click", event.target, typeof(event.target), state.board, typeof(state.board))



  }
)
//// Button listners
///// Toggles Divs for playing human or computer
playHumanButton.addEventListener("click", playHumanClick);
playComputerButton.addEventListener("click", playComputerClick);
resetButton.addEventListener("click", resetState);
resetOptionsButton.addEventListener("click", resetOptionsClick);

// Bootstrapping ----> Need to call(invoke) formulas
resetState();
renderBoard();

