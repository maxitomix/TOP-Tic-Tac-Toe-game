function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
  
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }

    const getBoard = () => board;

    return { getBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
      value = player;
    };
    const getValue = () => value;
  
    return {
        getValue, addToken
    };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
  ){
    const board = Gameboard();

    const players = [
      {
        name: playerOneName,
        token: 'X'
      },
      {
        name: playerTwoName,
        token: 'O'
      }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players [0];
    };

    const getActivePlayer = () => activePlayer;

    return {
      getActivePlayer, switchPlayerTurn, getBoard: board.getBoard
  };

}
  
function ScreenController(){
  const game = GameController();
  const playerTurnDiv = document.querySelector('.instruction');
  const boardContainer = document.querySelector('.board');

  const updateScreen = () => {
    boardContainer.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const button = document.createElement('button');
        button.classList.add('cell');
        button.dataset.row = rowIndex;
        button.dataset.column = columnIndex;
        button.textContent = cell.getValue();
        boardContainer.appendChild(button);
      })  
    })
  }
  updateScreen();
}


ScreenController();


