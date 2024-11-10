let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
	// TODO: Complete the function
   clearTimeout(computerMoveTimeout);
   computerMoveTimeout = 0;

   // Reset all buttons on the board
   getGameBoardButtons().forEach(button => {
      button.innerHTML = '';       // Clear text
      button.className = '';       // Remove any "x" or "o" class
      button.disabled = false;     // Enable button for clicks
   });

   playerTurn = true; // Player goes first
   document.getElementById("turnInfo").textContent = "Your turn";
}

function boardButtonClicked(button) {
	// TODO: Complete the function
   if (playerTurn) {
      button.innerHTML = 'X';           // Set player's mark
      button.classList.add("x");        // Add class for styling
      button.disabled = true;           // Disable button to prevent further clicks

      switchTurn(); // Switch to computer's turn
   }
}

function switchTurn() {
	// TODO: Complete the function
   const winnerStatus = checkForWinner();

   if (winnerStatus === gameStatus.MORE_MOVES_LEFT) {
      if (playerTurn) {
         // Switch to computer's turn
         playerTurn = false;
         document.getElementById("turnInfo").textContent = "Computer's turn";

         // Simulate computer thinking
         computerMoveTimeout = setTimeout(makeComputerMove, 1000);
      } else {
         // Switch to player's turn
         playerTurn = true;
         document.getElementById("turnInfo").textContent = "Your turn";
      }
   } else {
      // End game scenarios
      playerTurn = false; // Stop further moves

      if (winnerStatus === gameStatus.HUMAN_WINS) {
         document.getElementById("turnInfo").textContent = "You win!";
      } else if (winnerStatus === gameStatus.COMPUTER_WINS) {
         document.getElementById("turnInfo").textContent = "Computer wins!";
      } else if (winnerStatus === gameStatus.DRAW_GAME) {
         document.getElementById("turnInfo").textContent = "Draw game";
      }
   }
}

function makeComputerMove() {
	// TODO: Complete the function
   const buttons = Array.from(getGameBoardButtons()).filter(button => button.innerHTML === "");

	if (buttons.length > 0) {
		const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
		randomButton.innerHTML = 'O';       // Set computer's mark
		randomButton.classList.add("o");    // Add class for styling
		randomButton.disabled = true;       // Disable button to prevent further clicks
	}

	switchTurn();
}