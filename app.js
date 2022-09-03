//initil state ----> Setting up the Game Loop
const state = {};
const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", ""]
}

// Dom Selector ----> grabbing elements
const boardElement = document.getElementById('board');

//Dom Manipulators ----> rendering
const renderBoard = () => {
    for (let i = 0; i < state.board.length; i++) {
        const square = state.board[i];
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell')
        cellElement.innerHTML = square;
        boardElement.appendChild(cellElement)

    }

}




// Bootstrapping ----> Need to call(invoke) formulas
resetState()
renderBoard()
