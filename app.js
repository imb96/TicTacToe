let turn = '';
let turnNum = 0;
let turnCount = 0;
let score = [];
let board = [];


function createTable() {
  const table = document.querySelector('section#game table');
  for(let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for(let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      td.id = 'idx' + (i * 10 + j);
      td.addEventListener('click', handleClick);
      tr.appendChild(td);
    }
  }
}

function handleClick(e) {
  if(e.target.innerHTML) return;

  turnCount++;
  addMark(e.target);
  const idx = Number(e.target.id.substring(3));
  board[parseInt(idx / 10)][idx % 10] = turnNum;

  if(checkWin(parseInt(idx / 10), idx % 10)) {
    setTimeout(function () {
      alert(`${turn} WIN !`);
      addScore();
      resetGame();
    }, 10);
  }else if(turnCount == 9) {
    setTimeout(function () {
      alert('Tie Game !');
      resetGame();
    }, 10);
  }else {
    changeTurn();
  }
}

function checkWin(i, j) {
  let sero_cnt = 0, garo_cnt = 0;
  for(let k = 0; k < 3; k++) {
    if(board[k][j] == turnNum) sero_cnt++;
    if(board[i][k] == turnNum) garo_cnt++;
  }
  if(sero_cnt == 3 || garo_cnt == 3) return true;

  if(board[0][0] == turnNum && board[1][1] == turnNum && board[2][2] == turnNum) return true;
  if(board[0][2] == turnNum && board[1][1] == turnNum && board[2][0] == turnNum) return true;
  
  return false;
}

function addMark(target) {
  target.innerHTML = turn;
  target.className = `turn-${turn.toLowerCase()}`;
}

function addScore() {
  score[turnNum]++;
  document.querySelectorAll('section#score span')[turnNum].innerHTML = score[turnNum];
}

function changeTurn() {
  document.querySelector(`div.focus-${turn.toLowerCase()}`).style.display = 'none';
  turn = turn == 'X' ? 'O' : 'X';
  turnNum = 1 - turnNum;
  document.querySelector(`div.focus-${turn.toLowerCase()}`).style.display = 'block';
}

function newGame() {
  turn = 'X';
  turnNum = 0;
  score = [0, 0];
  document.querySelectorAll('section#score span').forEach((e) => (e.innerHTML = 0));
  document.querySelector('div.focus-x').style.display = 'block';
  document.querySelector('div.focus-o').style.display = 'none';
  resetGame();
}

function resetGame() {
  turnCount = 0;
  board = [];
  for(let i = 0; i < 3; i++) {
    board.push([]);
    for(let j = 0; j < 3; j++) {
      board[i].push(-1);
      document.querySelector(`td#idx${i * 10 + j}`).innerHTML = '';
    }
  }
}

window.onload = function() {
  createTable();
  newGame();
  document.querySelector('#newGameBtn').addEventListener('click', newGame);
  document.querySelector('#resetBtn').addEventListener('click',resetGame);
}