/* Build a Tic Tac Toe Game

User Story: I can play a game of Tic Tac Toe with the computer.

User Story: My game will reset as soon as it's over so I can play again.

User Story: I can choose whether I want to play as X or O.
*/

var board = [["", "", ""], ["", "", ""], ["", "", ""]];
var player;
var computer;
var squaresLeft = 9;
var cpuRow;
var cpuColumn;

/* Assigns the player and computer as X or O based on the button pressed at the start of the game, if O is chosen the computer moves first */
function chooseXorO(symbol) {
  if (symbol === "X") {
    player = "X";
    computer = "O";
    disableXO(symbol);
    enableBoard();
  } else {
    player = "O";
    computer = "X";
    disableXO(symbol);
    enableBoard();
    computerMove();
  }
}

/* Disables the X and O buttons after they are clicked to start the game */
function disableXO(symbol) {
  if (symbol === "X") {
    document.getElementById("xbutton").disabled = true;
    document.getElementById("xbutton").style.color = "orange";
    document.getElementById("obutton").disabled = true;
    document.getElementById("obutton").style.color = "black";
    document.getElementById("obutton").style.border = "none";
  } else {
    document.getElementById("xbutton").disabled = true;
    document.getElementById("xbutton").style.color = "black";
    document.getElementById("xbutton").style.border = "none";
    document.getElementById("obutton").disabled = true;
    document.getElementById("obutton").style.color = "orange";
  }
}

/* Enables clicking of buttons on the board */
function enableBoard() {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
  }
}

/* When the user clicks a square, disables the square, and tests if the player has won, if it's a tie game, then generates a computer move and checks if the computer has won */
function userMove(id) {
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).innerText = player;
  id = id.split("");
  board[id[0]][id[1]] = player;
  squaresLeft--;
  if (testWin(player)) {
    return;
  }
  if (squaresLeft === 0) {
    tieGame();
    return;
  }
  setTimeout(function() {
    computerMove();
  }, 250);
  if (testWin(computer)) {
    return;
  }
}

/* Tests if 3 symbols in a row are the same and ends the game if true */
function testWin(symbol) {
  if (
    (board[0][0] === symbol &&
      board[0][1] === symbol &&
      board[0][2] === symbol) ||
    (board[1][0] === symbol &&
      board[1][1] === symbol &&
      board[1][2] === symbol) ||
    (board[2][0] === symbol &&
      board[2][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][0] === symbol &&
      board[2][0] === symbol) ||
    (board[0][1] === symbol &&
      board[1][1] === symbol &&
      board[2][1] === symbol) ||
    (board[0][2] === symbol &&
      board[1][2] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
  ) {
    alert(symbol + " wins!");
    disableBoard();
    return true;
  }
}

/* Generates a random computer move in an empty square and disables that square */
function computerMove() {
  do {
    generateRandomMove();
  } while (
    board[cpuRow][cpuColumn] === player ||
    board[cpuRow][cpuColumn] === computer
  );
  board[cpuRow][cpuColumn] = computer;
  document.getElementById(cpuRow + "" + cpuColumn).innerHTML = computer;
  document.getElementById(cpuRow + "" + cpuColumn).removeAttribute("onclick");
  squaresLeft--;
}

/* Disables clicking of buttons on the board */
function disableBoard() {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeAttribute("onclick");
  }
}

/* Random number generation for use in computer square selection*/
function generateRandomMove() {
  cpuRow = Math.floor(Math.random() * 3);
  cpuColumn = Math.floor(Math.random() * 3);
}

/* Ends the game in a tie */
function tieGame() {
  alert("The game is a tie!");
  disableBoard();
}

/* Resets the game */
function gameReset() {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  squaresLeft = 9;
  document.getElementById("xbutton").disabled = false;
  document.getElementById("xbutton").style.color = "white";
  document.getElementById("xbutton").style.border = "1px solid white";
  document.getElementById("obutton").disabled = false;
  document.getElementById("obutton").style.color = "white";
  document.getElementById("obutton").style.border = "1px solid white";
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
    disableBoard();
  }
}