
// -- HTML elements --
const board = document.getElementById( 'board' );
const cells = document.querySelectorAll( '[data-cell]' );
const currentStatus = document.getElementById( 'currentStatus' );
const resetButton = document.getElementById( 'resetButton' );
const gameEndOverlay = document.getElementById( 'gameEndOverlay' );
const currentBeastStatusImg = document.getElementById( 'currentBeastImg' );
const winningMessage = document.querySelector( '[data-winning-message]' );
const winningMessageText = document.querySelector( '[data-winning-message] p' );
const winningMessageImg = document.createElement( 'img' );

// -- Game Variables --
let gameIsLive = true;
let unicornTurn = true;
let winner = null;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// -- Functions --
const setBoardHoverClass = () => {
  board.classList.remove( 'unicorn' );
  board.classList.remove( 'dragon' );

  if ( unicornTurn ) {
    board.classList.add( 'unicorn' );
  } else {
    board.classList.add( 'dragon' );
  }
}

const placeBeastImg = ( cell, currentBeast ) => {
  cell.classList.add( currentBeast );
}

const swapTurns = () => {
  unicornTurn = !unicornTurn;
}

const updateCurrentStatus = () => {
  if ( unicornTurn ) {
    currentBeastStatusImg.src = 'https://d14u0p1qkech25.cloudfront.net/1866310_1a73a077-9814-4c3c-8d42-c080530c3708_thumbnail_250x250';
    currentBeastStatusImg.alt = 'unicorn';
  } else {
    currentBeastStatusImg.src = 'https://i.ibb.co/3NXW3b5/aec095f0-9c94-4da3-959a-3a34ccdb6d4a.jpg';
    currentBeastStatusImg.alt = 'dragon';
  }
}

const checkWin = ( currentBeast ) => {
  return winningCombinations.some( combination => {
    return combination.every( i => {
      return cells[i].classList.contains( currentBeast );
    })
  });
}

const isDraw = () => {
  return [...cells].every( cell => {
    return cell.classList.contains( 'unicorn' ) || cell.classList.contains( 'dragon' );
  })
}

const startGame = () => {
  cells.forEach( cell => {
    winningMessageImg.remove();
    cell.classList.remove( 'unicorn' );
    cell.classList.remove( 'dragon' );
    cell.removeEventListener( 'click', handleCellClick );
    cell.addEventListener( 'click', handleCellClick, { once: true });
  });

  setBoardHoverClass();
  gameEndOverlay.classList.remove( 'show' );
}

const endGame = ( draw ) => {
  if ( draw ) {
    winningMessageText.innerText = `draw!`;
  } else {
    winningMessageImg.src = unicornTurn ? 'https://d14u0p1qkech25.cloudfront.net/1866310_1a73a077-9814-4c3c-8d42-c080530c3708_thumbnail_250x250' : 'https://i.ibb.co/3NXW3b5/aec095f0-9c94-4da3-959a-3a34ccdb6d4a.jpg';
    winningMessageImg.alt = unicornTurn ? 'unicorn' : 'dragon';
    winningMessage.insertBefore( winningMessageImg, winningMessageText );
    winningMessageText.innerText = `wins!!!`
  }

  gameEndOverlay.classList.add( 'show' );
}

// -- Event Handler --
const handleCellClick = ( e ) => {
  const cell = e.target;
  const currentBeast = unicornTurn ? 'unicorn' : 'dragon';

  placeBeastImg( cell, currentBeast );
  if ( checkWin( currentBeast )) {
    endGame( false );
  } else if ( isDraw()) {
    endGame( true );
  } else {
    swapTurns();
    updateCurrentStatus();
    setBoardHoverClass();
  }
}

// -- Event Listener --
resetButton.addEventListener( 'click', startGame );

// -- Start Game --
startGame();