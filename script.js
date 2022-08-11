'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0Score = document.querySelector('#current--0');
const current1Score = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerWinnertxt = document.querySelector('.player--winner-txt');

// declaring variables for condtions
let scores, currentScore, activePlayer, playing;

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0Score.textContent = 0;
  current1Score.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // playerWinnertxt.classList.add('hidden');
}
// initializing the game
init();
// swich player function
function switchPlayer() {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
  if (playing) {
    // generate random dice number
    const diceRandom = Math.trunc(Math.random() * 6) + 1;

    // display roll
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRandom}.png`;
    // checked for rolled 1
    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to another player &&cuurent score = 0
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to total score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if player hold scores switch to the next player\

    // total scores >= 100 active players wins
    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // TODO add congratulation message to the winner
      // playerWinnertxt.textContent = `player${
      //   activePlayer + 1
      // } wins the game!! 🎉🎆🎇 `;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
