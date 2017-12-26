/*
 * Create a list that holds all of your cards
 */
var symbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'],
    cardSymbol = symbols.concat(symbols),
    deck = document.querySelector(".deck"),
    theTimer = document.querySelector('.timer'),
    moveCount = document.querySelector('.moves'),
    restartBtn = document.querySelector('.restart'),
    stars = document.querySelector('.stars'),
    cards = [],
    openCardList = [],
    timer = [0, 0, 0, 0],
    move = 0,
    myStar,
    interval;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



function displayCards() {
    cardSymbol = shuffle(cardSymbol);
    for (var i = 0; i < cardSymbol.length; i++) {
        var card = document.createElement('li');
        card.className = 'card';
        card.innerHTML = '<i class="fa fa-' + cardSymbol[i] + '"></i>';
        deck.appendChild(card);
        cards.push(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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



function setupClicks() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', handleClicks);
    }

    function handleClicks(e) {
        var targetClick = e.target;
        while (targetClick && targetClick.parentNode !== deck) {
            targetClick = targetClick.parentNode;
            if (!targetClick) {
                return;
            }
        }

        var clickedCard = targetClick.classList.contains('open');
        if (!clickedCard && openCardList.length !== 2) {
            displayOpenCard(targetClick);
            setTimeout(function() {
                checkCardsMatch();
            }, 300);

            setTimeout(function() {
                completeChecker();
            }, 400);
            // console.log(targetClick.innerHTML);
        }

    }

    function displayOpenCard(card) {
        card.classList.add('open', 'show');
        openCardList.push(card);
    }

    function checkCardsMatch() {
        if (openCardList.length == 2) {
            movesCount();
            var firstCard = openCardList[0];
            var secondCard = openCardList[1];
            compareCards(firstCard, secondCard);
            openCardList = [];
        }
    }

    function compareCards(firstCard, secondCard) {
        var firstClickedCard = firstCard.children[0].className;
        var secondClickedCard = secondCard.children[0].className;
        if (firstClickedCard == secondClickedCard) {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.classList.add('match', 'animated', 'rubberBand');
            secondCard.classList.add('match', 'animated', 'rubberBand');
            firstCard.removeEventListener('click', handleClicks);
            secondCard.removeEventListener('click', handleClicks);
        } else {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.classList.add('unmatch', 'animated', 'wobble');
            secondCard.classList.add('unmatch', 'animated', 'wobble');

            setTimeout(function() {
                firstCard.classList.remove('unmatch', 'animated', 'wobble', 'show');
                secondCard.classList.remove('unmatch', 'animated', 'wobble', 'show');
            }, 400);
        }
    }

    function completeChecker() {
        var cardList = document.getElementsByClassName('card'),
            isLocked = true;
        for (var i = 0; i < cardList.length; i++) {
            if (!cardList[i].classList.contains('match')) {
                isLocked = false;
            }
        }
        if (isLocked) {

            sweetAlert();
        }
    }

    function sweetAlert() {
        var totalMoves = moveCount.innerHTML,
            totalTime = theTimer.innerHTML,
            totalStar = stars.childElementCount;
        swal({
            title: "Excellent!",
            html: '<span class="win-massage">' + totalMoves + ' Moves</span><br/>' +
                '<span class="win-massage">' + totalStar + ' Stars</span><br/>' +
                '<span class="win-massage">' + totalTime + ' Your Time</span>',
            type: "success",
            confirmButtonColor: "#00b9a6",
            confirmButtonText: "Play again!",
            allowOutsideClick: false
        }).then(function() {
            clearInterval(interval);
            restart();
        });

    }

    // Move Count start
    function movesCount() {
        move += 1;
        moveCount.innerHTML = move;
        starScore();
    }

    function starScore() {
        myStar = stars.children;
        if ((move % 10 === 0) && (myStar.length > 1)) {
            stars.removeChild(myStar[myStar.length - 1]);
        }
    }


    // Add leading zero to numbers 9 or below (purely for aesthetics):
    function leadingZero(time) {
        if (time <= 9) {
            time = "0" + time;
        }
        return time;
    }

    function runTimer() {
        var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
        theTimer.innerHTML = currentTime;
        timer[3]++;

        timer[0] = Math.floor((timer[3] / 100) / 60);
        timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
        timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
    }
    interval = setInterval(runTimer, 10);
}

function createStar() {
    stars.innerHTML = '';
    for (var i = 0; i < 3; i++) {
        var star = document.createElement('li');
        star.innerHTML = '<i class="fa fa-star"></i>';
        stars.appendChild(star);
    }
}

function restart() {
    deck.innerHTML = "";
    cards = [];
    openCardList = [];
    move = 0;
    moveCount.innerHTML = '';
    timer = [0, 0, 0, 0];
    displayCards();
    setupClicks();
    createStar();
}

restartBtn.addEventListener("click", function() {
    swal({
        title: "Restart the game",
        type: "warning",
        confirmButtonText: "YES",
        confirmButtonColor: "#00b9a6",
        allowOutsideClick: false
    }).then(function() {
        clearInterval(interval);
        restart();
    });
});

function initGame() {
    displayCards();
    setupClicks();
    createStar();
}

initGame();