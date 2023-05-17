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
    let value = '---';

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
  playerTwoName = "Player Two",
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



    const playRound = () => {
      switchPlayerTurn();
      const gameBoard = board.getBoard();
      let hasEmptyCell = false;
  
      gameBoard.forEach((row) => {
        row.forEach((cell) => {
          if (cell.getValue() === '---') {
            hasEmptyCell = true;
          }
        });
      });

      const checkWinCondition = (gameBoard) => {
        // Check rows
        for (let i = 0; i < 3; i++) {
          if (
            gameBoard[i][0].getValue() !== '---' &&
            gameBoard[i][0].getValue() === gameBoard[i][1].getValue() &&
            gameBoard[i][1].getValue() === gameBoard[i][2].getValue()
          ) {
            return gameBoard[i][0].getValue();
          }
        }
      
        // Check columns
        for (let i = 0; i < 3; i++) {
          if (
            gameBoard[0][i].getValue() !== '---' &&
            gameBoard[0][i].getValue() === gameBoard[1][i].getValue() &&
            gameBoard[1][i].getValue() === gameBoard[2][i].getValue()
          ) {
            return gameBoard[0][i].getValue();
          }
        }
      
        // Check diagonals
        if (
          gameBoard[0][0].getValue() !== '---' &&
          gameBoard[0][0].getValue() === gameBoard[1][1].getValue() &&
          gameBoard[1][1].getValue() === gameBoard[2][2].getValue()
        ) {
          return gameBoard[0][0].getValue();
        }
      
        if (
          gameBoard[0][2].getValue() !== '---' &&
          gameBoard[0][2].getValue() === gameBoard[1][1].getValue() &&
          gameBoard[1][1].getValue() === gameBoard[2][0].getValue()
        ) {
          return gameBoard[0][2].getValue();
        }
      
        return null;
      };


      if (!hasEmptyCell) {
        console.log('All cells are filled. Game Over! DRAW!');
        alert('All cells are filled. Game Over! DRAW!');
        resetBoard();
        return;
      }

      const winToken = checkWinCondition(gameBoard);
      if (winToken) {
        console.log(`Player ${winToken} wins! Game Over!`);
        alert(`Player ${winToken} wins! Game Over!`);
        resetBoard();
        return;
      }

      
    };


    const resetBoard = () => {
      activePlayer = players[0];
      const gameBoard = board.getBoard();
      gameBoard.forEach((row) => {
        row.forEach((cell) => {
          cell.addToken('---');
        });
      });
    };


    return {
      getActivePlayer, getBoard: board.getBoard, switchPlayerTurn, playRound,
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
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    console.log('Current Game Board:');
    board.forEach((row) => {
      const rowValues = row.map((cell) => cell.getValue());
      console.log(rowValues);
    });

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const button = document.createElement('div');
        button.classList.add('cell');
        button.dataset.row = rowIndex;
        button.dataset.column = columnIndex;
        button.textContent = cell.getValue();
        boardContainer.appendChild(button);
        button.addEventListener('click', () => {
          console.log(`Button clicked at row ${rowIndex} and column ${columnIndex}`);
          if (cell.getValue() === '---') {
            cell.addToken(activePlayer.token);
            game.playRound();
            updateScreen();
            
          }
        })
      })  
    })
  }
  updateScreen();
}


ScreenController();



