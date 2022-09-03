//initil state ----> Setting up the Game Loop
const state = {};
const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", ""]
    state.currentPlayer = "x"
}

// Dom Selector ----> grabbing elements
const boardElement = document.getElementById('board');

//Dom Manipulators ----> rendering
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


// EventListeners
boardElement.addEventListener('click', (event) => {
    if (event.target.className !== 'cell') return;
    let cellIndex = event.target.dataset.index;
    state.board[cellIndex] = state.currentPlayer;
    if(state.currentPlayer === 'x') {
    state.currentPlayer = 'o'}
    else {state.currentPlayer = 'x'}
    // statusDisplay.innerHTML = currentPlayerTurn();
    renderBoard()
  }
)

// Bootstrapping ----> Need to call(invoke) formulas
resetState();
renderBoard();

