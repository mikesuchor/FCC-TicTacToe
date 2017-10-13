/* Build a Tic Tac Toe Game

User Story: I can play a game of Tic Tac Toe with the computer.

User Story: My game will reset as soon as it's over so I can play again.

User Story: I can choose whether I want to play as X or O.
*/

var board = [["", "", ""], ["", "", ""], ["", "", ""]];
var player;
var computer;
var cpuRow;
var cpuColumn;

// Ways to win for player
function testPlayerWin() {
  if (
    (board[0][0] === player && board[0][1] === player && board[0][2] === player) ||
    (board[1][0] === player && board[1][1] === player && board[1][2] === player) ||
    (board[2][0] === player && board[2][1] === player && board[2][2] === player) ||
    (board[0][0] === player && board[1][0] === player && board[2][0] === player) ||
    (board[0][1] === player && board[1][1] === player && board[2][1] === player) ||
    (board[0][2] === player && board[1][2] === player && board[2][2] === player) ||
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][2] === player && board[2][2] === player)
  ) {
    alert("Player (" + player + ") wins!");
    disableBoard();
    return(true);
  }
}

function testComputerWin() {
  if (
    (board[0][0] === computer && board[0][1] === computer && board[0][2] === computer) ||
    (board[1][0] === computer && board[1][1] === computer && board[1][2] === computer) ||
    (board[2][0] === computer && board[2][1] === computer && board[2][2] === computer) ||
    (board[0][0] === computer && board[1][0] === computer && board[2][0] === computer) ||
    (board[0][1] === computer && board[1][1] === computer && board[2][1] === computer) ||
    (board[0][2] === computer && board[1][2] === computer && board[2][2] === computer) ||
    (board[0][0] === computer && board[1][1] === computer && board[2][2] === computer) ||
    (board[0][2] === computer && board[1][2] === computer && board[2][2] === computer)
  ) {
    alert("Computer (" + computer + ") wins!");
    disableBoard();
    return(true);
  }
}

/* Assigns the player and computer as X or O based on the button pressed at the start of the game */
function chooseXorO(symbol) {
  if (symbol === "X") {
    player = "X";
    computer = "O";
    disableXO();
    enableBoard();
  } else {
    player = "O";
    computer = "X";
    disableXO();
    enableBoard();
  }
}

/* Disables the X and O buttons after they are clicked to start the game */
function disableXO() {
  document.getElementById("xbutton").disabled = true;
  document.getElementById("obutton").disabled = true;
}

/* Enables clicking of buttons on the board */
function enableBoard() {
  var x = document.getElementsByClassName("box");
  for (var i = 0; i < x.length; i++) {
    x[i].disabled = false;
  }
}

/* Disables clicking of buttons on the board */
function disableBoard() {
  var x = document.getElementsByClassName("box");
  for (var i = 0; i < x.length; i++) {
    x[i].disabled = true;
  }
}

function playerMove(id, value) {
  document.getElementById(id).disabled = true;
  document.getElementById(id).innerText = player;
  id = id.split("");
  board[id[0]][id[1]] = player;
  if(testPlayerWin()) {
    return;
  }
  computerMove();
  if(testComputerWin()) {
    return;
  }
}

function computerMove() {
  do {
    generateRandomMove();
  } while ((board[cpuRow][cpuColumn] === player) || (board[cpuRow][cpuColumn] === computer));
  board[cpuRow][cpuColumn] = computer;
  document.getElementById(cpuRow + '' + cpuColumn).disabled = true;
  document.getElementById(cpuRow + '' + cpuColumn).innerHTML = computer;
}

function generateRandomMove() {
  cpuRow = Math.floor(Math.random() * 3);
  cpuColumn = Math.floor(Math.random() * 3);
}

function gameReset() {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  document.getElementById("xbutton").disabled = false;
  document.getElementById("obutton").disabled = false;
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    disableBoard();
  }
}