//Challange 1: Your age in Days


function ageInDays(){
    var birthYear = prompt("What year you are bron.. Good friend?");
    var ageInDays = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ ageInDays + 'days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//Challange 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}


//Challange 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numberToChoice(randToRpsInt());
    console.log("Computer Choice: ", botChoice);

    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    console.log(results)

    message = finalMessage(results); //{'message': 'You won!', 'color': 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(numbre){
    return ['rock', 'paper', 'scissors'][numbre];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'rock': 0.5, 'paper':0, 'scissors': 1},
        'paper':{'rock': 1, 'paper':0.5, 'scissors': 0},
        'scissors':{'rock': 0, 'paper':1, 'scissors': 0.5}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You lost!', 'color':'red'};
    } else if(yourScore === 0.5){
        return {'message': 'You tied!', 'color': 'yellow'};
    } else{
        return {'message': 'You won!', 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style= 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>"+finalMessage['message']+"</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38, 24, 1);'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

}


//Challenge 4: Change the Color of All Buttons

var allButtons = document.getElementsByTagName('button');

// console.log(allButtons);

var copyAllButtons = [];
for (let i=0; i < allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}

// console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    // console.log(buttonThingy.value)
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if(buttonThingy.value === 'green'){
        buttonGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonReset();
    } else if(buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonRed() {
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    var choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];

    for(let i=0; i < allButtons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[randomNumber]);
    }
}

//Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A':[1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);  // click hit button
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic); // click stand button
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal); // click deal button

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        // console.log(card, "cardImage");
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true){

        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        // console.log(yourImages);
        // yourImages[0].remove();
        
        for(i=0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
    
        for(i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
    
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        // If adding 11 keeps me below 21, add 11, otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;

    // bot functionality
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// compute winner and return who just won
// update the wins, draws, and losses
function computeWinner(){
    let winner ;

    if (YOU['score'] <= 21){
        // condition: higher score than dealer or when dealer bust but you're score is less than dealer score
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            // console.log('You won!');
            winner = YOU;

        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            // console.log('You lost!');
            winner = DEALER;

        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
            // console.log('Draw!');
        }

        // condition: when user busts but dealer doesn't
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        // console.log('You lost!');
        winner = DEALER;

        // condition: when you and the dealer busts
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
        // console.log('Draw!')
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
    
        } else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lostSound.play();
    
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'Draw!';
            messageColor = 'black'
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}