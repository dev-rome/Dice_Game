const getElement = (id) => document.getElementById(id);
const querySelector = (selector) => document.querySelector(selector);

const score0El = getElement("score--0");
const score1El = getElement("score--1");
const current0El = getElement("current--0");
const current1El = getElement("current--1");
const player0El = querySelector(".player--0");
const player1El = querySelector(".player--1");
const diceEl = querySelector(".dice");
const newButtonEl = querySelector(".btn--new");
const rollButtonEl = querySelector(".btn--roll");
const holdButtonEl = querySelector(".btn--hold");

let playing = true;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const initializeGame = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

initializeGame();

const updateCurrentScore = () => {
  getElement(`current--${activePlayer}`).textContent = currentScore;
};

const switchPlayers = () => {
  getElement(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const rollDice = () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      updateCurrentScore();
    } else {
      switchPlayers();
    }
  }
};

const holdCurrentScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    getElement(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      querySelector(`.player--${activePlayer}`).classList.remove(
        "player--active"
      );
    } else {
      switchPlayers();
    }
  }
};

rollButtonEl.addEventListener("click", rollDice);
holdButtonEl.addEventListener("click", holdCurrentScore);
newButtonEl.addEventListener("click", initializeGame);
