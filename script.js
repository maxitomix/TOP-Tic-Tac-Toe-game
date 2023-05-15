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
    const getValue = () => value;
  
    return {
        getValue
    };
  }

const gameboard = Gameboard();
console.log(gameboard.getBoard());