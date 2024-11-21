const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle a cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Ignore if the cell is already taken or game is over
  if (gameState[index] || checkWinner()) return;

  // Update the cell and game state
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for a win or draw
  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} Wins!`;
  } else if (gameState.every(cell => cell)) {
    message.textContent = 'It\'s a Draw!';
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => 
    combination.every(index => gameState[index] === currentPlayer)
  );
}

// Restart the game
function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial message
message.textContent = `Player ${currentPlayer}'s Turn`;
