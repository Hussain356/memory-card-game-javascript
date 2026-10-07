const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time");
const flipsTag = document.querySelector(".flips");
const refreshBtn = document.querySelector("button");

let maxTime = 60, timeLeft = maxTime;
let flips = 0, matchedPairs = 0;
let cardOne = null, cardTwo = null;
let disableDeck = false, isPlaying = false, timer;

// SHUFFLE & ASSIGN IMAGES
function shuffleCards(){
  let numbers = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
  numbers.sort(() => Math.random() - 0.5);

  cards.forEach((card, i) => {
    card.classList.remove("flip","shake");
    card.querySelector(".back-view img").src = `images/img-${numbers[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

// TIMER
function startTimer(){
  timer = setInterval(() => {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if(timeLeft === 0) clearInterval(timer);
  }, 1000);
}

// FLIP LOGIC
function flipCard(){
  if(disableDeck || this === cardOne || timeLeft <= 0) return;

  if(!isPlaying){
    isPlaying = true;
    startTimer();
  }

  this.classList.add("flip");
  flips++;
  flipsTag.innerText = flips;

  if(!cardOne){
    cardOne = this;
    return;
  }

  cardTwo = this;
  disableDeck = true;
  checkMatch();
}

// MATCH CHECK
function checkMatch(){
  let img1 = cardOne.querySelector(".back-view img").src;
  let img2 = cardTwo.querySelector(".back-view img").src;

  if(img1 === img2){
    matchedPairs++;
    resetCards(true);
    if(matchedPairs === 8) clearInterval(timer);
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => resetCards(false), 1200);
  }
}

function resetCards(isMatch){
  if(!isMatch){
    cardOne.classList.remove("flip","shake");
    cardTwo.classList.remove("flip","shake");
  }
  cardOne = cardTwo = null;
  disableDeck = false;
}

// RESET GAME
function resetGame(){
  clearInterval(timer);
  timeLeft = maxTime;
  flips = matchedPairs = 0;
  isPlaying = false;
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  shuffleCards();
}

refreshBtn.addEventListener("click", resetGame);

// INIT
shuffleCards();