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

  const reset = () => {
    gameboard = Array(9).fill(null);
  };

  return { makemove, getBoard, reset };
};

const GameController = () => {
  const player1 = Player("Bob", "X");
  const player2 = Player("Alice", "O");
  const board = Gameboard();

  let currentPlayer = player1;

  const reset = () => {
    board.reset();
    currentPlayer = player1;
  };

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

  const checkTie = (boardState) => {
    return boardState.every((square) => square !== null);
  };

  const playRound = (square) => {
    board.makemove(currentPlayer.symbol, square);
    const boardState = board.getBoard();

    console.log(boardState);
    if (checkWinner(boardState, currentPlayer.symbol)) {
      const dialog = document.getElementById("resultDialog");
      const message = document.getElementById("resultMessage");

      message.textContent = `${currentPlayer.name} wins!`;
      dialog.showModal();

      return;
    }

    if (
      !checkWinner(boardState, currentPlayer.symbol) &&
      checkTie(boardState)
    ) {
      const dialog = document.getElementById("resultDialog");
      const message = document.getElementById("resultMessage");

      message.textContent = `It's a tie!`;
      dialog.showModal();
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { playRound, getCurrentPlayer, reset };
};

restartBtn.addEventListener("click", () => {
  document.querySelectorAll(".grid").forEach((cell) => {
    cell.innerHTML = "";
  });

  controller.reset();
});

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
