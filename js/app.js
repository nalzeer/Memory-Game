/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var moves = 0; // store the moves number of  cards paires.
var matches = 0; // store the number of paires matches of cards.
var opendCards = []; // store the cards have been opend.

// this function to generate new frame of cards.
function newFrame() {
  shuffle(cards);
 	for(var i = 0; i < cards.length; i++){
    $(".deck").append('<li class="card"><i class="fa '+cards[i]+'"></i></li>');
 	}
}

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// creat an object of timer.
// https://albert-gonzalez.github.io/easytimer.js/
var timer = new Timer();
timer.addEventListener("secondsUpdated", function (e) { $("#timer").html(timer.getTimeValues().toString());});

// restart the game.
$(".restart").click(function() {
    location.reload();
});

//initial function.
 function startGame() {
     newFrame();
     $(".card").click(flipCard);
     $(".moves").html("0 ");
     for (var i = 0; i < 3; i++) {
         $(".stars").append('<li><i class="fa fa-star"></i></li>');
     }
 }

// function of the functionalty of the flip card.
function flipCard() {
    timer.start();

    if (opendCards.length === 0) {
        $(this).addClass("open show");
        opendCards.push($(this));
        movesUpdate();
        noCLicks();
    }
    else if (opendCards.length === 1) {
        $(this).addClass("open show");
        opendCards.push($(this));
        setTimeout(comparingCards, 1000);
    }
}

// function of disabling the clicks of the opend card.
function noCLicks() {
    opendCards.forEach(function (card) {
        card.off("click");
    });
}

// function of updating the cards moves.
function movesUpdate() {
    moves ++;
    $(".moves").html(moves);
    if (moves == 16) {
        $(".stars").children()[0].remove();
    }
    else if (moves == 24) {
        $(".stars").children()[0].remove();
    }
}

// function for comparing the cards.
function comparingCards() {
    if (opendCards[0].children().attr("class") == opendCards[1].children().attr("class")) {
        opendCards[0].addClass("match");
        opendCards[1].addClass("match");
        noCLicks();
        opendCards = [];
        matches += 1;
        if (matches == 8) {
            gameResult();
        }
    }
    else {
        opendCards[0].removeClass("open show");
        opendCards[1].removeClass("open show");
        clickOn();
        opendCards = [];
    }
}

// function of enabling the clicks of the closed cards.
function clickOn() {
    opendCards[0].click(flipCard);
}

// https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// function of the game results.
function gameResult() {
    	timer.pause(); // to pause the timer.
      modal.style.display = "block"; // when the player win, open the modal.
    	$(".result").html($(".modal-scores").html()); // copy the score to the modal.
      $(".restart").click(function() {
          location.reload();
      });
      span.onclick = function() {
        modal.style.display = "none";
      };
}


// starting function.
startGame();
