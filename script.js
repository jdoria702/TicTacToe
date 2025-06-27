function Player(player_name, player_symbol) {
  const name = player_name;
  const symbol = player_symbol;

  return { name, symbol };
}

function Gameboard() {
  let gameboard = Array(9).fill(null);

  const makemove = (symbol, square) => {
    if (gameboard[square] === null) {
      gameboard[square] = symbol;
    }
  };

  const getBoard = () => [...gameboard];

  return { makemove, getBoard };
}

const player1 = Player("Jason", "X");
const game = Gameboard();

game.makemove(player1.symbol, 0);
console.log(game.getBoard());
