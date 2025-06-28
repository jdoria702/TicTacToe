const Player = (player_name, player_symbol) => {
  const name = player_name;
  const symbol = player_symbol;

  return { name, symbol };
};

const Gameboard = () => {
  let gameboard = Array(9).fill(null);

  const makemove = (symbol, square) => {
    if (gameboard[square] === null) {
      gameboard[square] = symbol;
    }
  };

  const getBoard = () => [...gameboard];

  return { makemove, getBoard };
};

const GameController = () => {
  const player1 = Player("Bob", "X");
  const player2 = Player("Alice", "O");
  const board = Gameboard();

  let currentPlayer = player1;

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (boardState, symbol) => {
    return winPatterns.some((pattern) =>
      pattern.every((index) => boardState[index] === symbol)
    );
  };

  const playRound = (square) => {
    board.makemove(currentPlayer.symbol, square);
    const boardState = board.getBoard();

    console.log(boardState);
    if (checkWinner(boardState, currentPlayer.symbol)) {
      console.log(`${currentPlayer.name} wins!`);
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { playRound, getCurrentPlayer };
};

const controller = GameController();

xSVG = '<img src="icons/alpha-x.svg" alt="X" />';
oSVG = '<img src="icons/circle-outline (1).svg" alt="X" />';
const grids = document.querySelectorAll(".grid");

grids.forEach((grid) => {
  grid.addEventListener("click", () => {
    const square = parseInt(grid.id);
    if (grid.innerHTML !== "") {
      return;
    }
    const currentPlayer = controller.getCurrentPlayer();
    controller.playRound(square);
    grid.innerHTML = currentPlayer.symbol === "X" ? xSVG : oSVG;
  });
});
