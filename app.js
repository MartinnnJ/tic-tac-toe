'use strict';
// created by Martin Jancura
const players = ['⭕', '❌']; // 0, 1

// selectors
const msg = document.querySelector('.msg');
const gameBoard = document.querySelector('table');
const gameBoardReset =
`<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>`;
const scoreCounter = document.querySelector('.score');

// game init
let currentPlayer = players[getRandomNumber(0, 2)];
msg.innerText = `Player ${currentPlayer} starts the game`;
scoreCounter.innerHTML = `<p>${players.at(0)} <span>0</span>:<span>0</span> ${players.at(1)}</p>`;

// game process
gameBoard.addEventListener('click', e => {
  const clickedCell = e.target;
  const isCellEmpty = !clickedCell.dataset.value; // ! converts value to boolean
  if (isCellEmpty === true) {
    clickedCell.dataset.value = players.indexOf(currentPlayer);
    clickedCell.innerText = currentPlayer;
    const gameBoardBin = gameBoardToBinaryNestedArr(gameBoard);
    const result = isGameWon(gameBoardBin);

    if (result.status === true) { // we have a winner, or it's draw
      gameBoard.classList.add('unclickable');
      if (result.winner === 0 || result.winner === 1) {
        msg.innerHTML = `<strong>Player ${result.winner === 0 ? players.at(0) : players.at(1)} has won!</strong>`;
        const updatedScoreSpans = updateScore(scoreCounter, result.winner);
        scoreCounter.innerHTML = `<p>${players.at(0)} ${updatedScoreSpans} ${players.at(1)}</p>`;
        highlightWinningCells(gameBoard, result.winPosition);
      }
      if (result.winner === null) msg.innerHTML = `<strong>Draw! No player has won</strong>`;
      setTimeout(() => {
        gameBoard.innerHTML = gameBoardReset;
        currentPlayer = players[getRandomNumber(0, 2)];
        msg.innerText = `Player ${currentPlayer} is on turn`;
        gameBoard.classList.remove('unclickable');
      }, 3500);

      return;
    }

    const index = players.indexOf(currentPlayer);
    currentPlayer = index === 0 ? players[1] : players[0]; // switching players
    msg.innerText = `Player ${currentPlayer} is on turn`;
  }
})

// helper functions
function getRandomNumber(min, max) {
  const number = Math.random() * (max - min) + min;
  return Math.floor(number);
}

function gameBoardToBinaryNestedArr(currGameSnap) {
  const arr = []; // binary array
  for (const row of currGameSnap.children[0].children) {
    for (const cell of row.children) {
      arr.push(cell.dataset.value ? +cell.dataset.value : null);
      // transforming gameBoard (table el.) into binary array, for exam. [1, 0, 0, 0, 0, null, null, 1, 1]
    }
  }
  // transforming binary array into NESTED binary array according to different types of win
  // for exam. nested array for horizontal win will look like [[0, 1, 0], [1, 1, 1], [null, 0, null]]
  const temp1 = [[], [], []]; // array for horizontal win
  const temp2 = [[], [], []]; // array for vertical win
  const temp3 = [[], []]; // array for X win

  let [a, b, c] = [0, 1, 2]; // cell indexes for horizontal win
  let [d, e, f] = [0, 3, 6]; // cell indexes for vertical win
  let [g, h, i] = [0, 4, 8]; // cell indexes for X win

  for (let x = 0; x < 3; x++) {
    temp1[x].push(arr[a]);
    temp1[x].push(arr[b]);
    temp1[x].push(arr[c]);
    a += 3; b += 3; c += 3;

    temp2[x].push(arr[d]);
    temp2[x].push(arr[e]);
    temp2[x].push(arr[f]);
    d += 1; e += 1; f += 1;

    if (x !== 2) {
      temp3[x].push(arr[g]);
      temp3[x].push(arr[h]);
      temp3[x].push(arr[i]);
      g += 2; i -= 2;
    }
  }
  
  return [temp1, temp2, temp3];
}

function isGameWon(nestedBinaryArr) {
  for (const [index, arr] of nestedBinaryArr.entries()) {
    for (const [nestedIndex, nestedArr] of arr.entries()) {
      const result = nestedArr.every(num => num === 0) || nestedArr.every(num => num === 1);
      if (result === true) {
        return { status: true, winner: nestedArr.at(0), winPosition: [index, nestedIndex], }
        // winPosition [0, 1] means that we have horizontal win at second row
        // winPosition [1, 2] means that we have vertical win at third column
        // winPosition [2, 0] means that we have X win in direction \
      }
    }
  }

  if (!(nestedBinaryArr.at(0).flat().some(val => val === null))) {
    return { status: true, winner: null, winPosition: null } // no free cells left, no player has won, it's draw
  }

  return { status: false, winner: null, winPosition: null } // default return, if free cells exists, but still no player has won
}

function updateScore(currScoreSnap, winner) {
  const [firstSpan, secondSpan] = Array.from(currScoreSnap.querySelectorAll('span'));
  const previousSpanValues = [+firstSpan.innerText, +secondSpan.innerText];
  const updatedSpanValues = [
    winner === 0 && previousSpanValues[0] + 1 || previousSpanValues[0],
    winner === 1 && previousSpanValues[1] + 1 || previousSpanValues[1]
  ];

  return `<span>${updatedSpanValues[0]}</span>:<span>${updatedSpanValues[1]}</span>`;
}

function highlightWinningCells(currGameSnap, position) {
  const winType = position.at(0); // 0 is for horizontal, 1 is for vertical and 2 is for X win
  const y = position.at(1);
  const rows = Array.from(currGameSnap.querySelectorAll('tr'));

  if (winType === 0) { // horizontal win
    for (const cell of rows[y].querySelectorAll('td')) {
      cell.classList.add('win-cell');
    }
  } else if (winType === 1) { // vertical win
    for (const [i, _] of rows.entries()) {
      const cell = rows[i].querySelectorAll('td')[y];
      cell.classList.add('win-cell');
    }
  } else { // X win
    let num = rows.length - 1;
    for (const [i, _] of rows.entries()) {
      if (y === 0) {
        const cell = rows[i].querySelectorAll('td')[i];
        cell.classList.add('win-cell');
      } else { // y === 1
        const cell = rows[i].querySelectorAll('td')[num];
        cell.classList.add('win-cell');
        num--;
      }
    }
  }
}
