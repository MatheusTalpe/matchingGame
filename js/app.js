const playAgain = document.querySelector("#playAgain");
const deck = document.querySelector(".deck");
const restartButton = document.querySelector(".fa-repeat");
const starsModal = document.querySelector(".stars-modal");
const starsMain = document.querySelector(".stars");
let cards = [...document.getElementsByClassName("card")];
let clicks = 0;
let selectedCards = [];
let matchedPairs = 0;
let stars = [...document.getElementsByClassName("fa fa-star")];
let timer = document.querySelector(".timer");
let seconds = 0;
let timerId;
let modal = document.querySelector(".modal");
let modalTime = document.querySelector(".modal-time");


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* this functions initializes/restart the game shuffling the cards and initializing
   some vars. */
let initializeGame = function() {

  // initializes components from the main screen
   modal.style.visibility = "collapse";
   document.querySelector(".moves").textContent = 0;

   timer.innerHTML=("0:0");
   clearInterval(timerId);

   stars[0].style.visibility = "visible";
   stars[1].style.visibility = "visible";
   stars[2].style.visibility = "visible";

   for (let star of stars) {
     starsMain.appendChild(star);
   }

   // initializes the vars
   clicks = 0;
   selectedCards = [];
   matchedPairs = 0;
   seconds = 0;

   // initializes the modal components
   while (starsModal.firstChild) {
     starsModal.removeChild(starsModal.firstChild);
   }

   // shuffles the cards
   var shCards = shuffle(cards);

   // assembles the deck
   for (let card of shCards) {
     card.classList.remove("show", "open", "match");
     deck.appendChild(card);
   }
}


// This function verifies if the select cards are equal and sets the deck's reaction accordingly
function isEqualCard (cardsArray) {

  if (cardsArray[0].isEqualNode(cardsArray[1])) {
      cardsArray[0].classList.toggle("match");
      cardsArray[1].classList.toggle("match");
      return true;
  } else {
      setTimeout(function() {
      cardsArray[0].classList.remove("show", "open")
      cardsArray[1].classList.remove("show", "open");
      return false;
    },500);
  }
}


// This functions sets the Congratulations Modal
function setModal() {

  // stops the timer
  clearInterval(timerId);

  // shows the modal, total time and rating
  modal.style.visibility = "visible";
  modalTime.innerHTML=(parseInt(seconds/60,10) + ":" + seconds%60);

  for (let star of stars) {
    starsModal.appendChild(star);
  }
}


// This functions does click related verifications
function verifyClicks() {

  // Verifies if it's the first captured click to start the timer
  if (clicks === 1) {
      timerId = setInterval( function(){
                      ++seconds;
                      timer.innerHTML=(parseInt(seconds/60,10) + ":" + seconds%60);
                    }, 1000);
  }

  // Verfifes the quantities of clicks to rate the player using the stars
  if (clicks <= 60) {
      if (clicks > 16 && clicks <= 17) {
          stars[2].style.visibility = "collapse";
      } else if (clicks >= 18 && clicks <= 25) {
          stars[1].style.visibility = "collapse";
      } else if (clicks > 60) {
          stars[0].style.visibility = "collapse";
      }
  }

  // Verifies if the player has finished the game by matching all the pairs
  if (matchedPairs === 8) {
      setModal();
  }

}


// Flips the received card and verifies the cards/clicks related conditions of the game
function showCard(card) {
  ++clicks;

  // flips the selected card
  card.classList.toggle("show");
  card.classList.toggle("open");

  // pushes it into an array
  selectedCards.push(card);

  // sets the moves counter
  document.querySelector(".moves").textContent = clicks;

  //verifies the amount of selected cars to verify if they are equal
  if (selectedCards.length === 2) {
      if (isEqualCard(selectedCards)) {
        ++matchedPairs;
      }
      selectedCards = [];
  }

  verifyClicks();
}


// This section of the program sets the events listeners and once the browser has loaded, initializes the game.
  restartButton.addEventListener("click", initializeGame);
  playAgain.addEventListener("click", initializeGame);

  for (let card of cards) {
    card.addEventListener("click", function(){
                                if (!card.classList.contains("show")) {
                                    showCard(card);
                                } });
  }

  window.onload = initializeGame;
// end-of-section
