const cardArray = [
    {
        name: 'fox',
        img: 'images/fox.png',
    },
    {
        name: 'frog',
        img: 'images/frog.png',
    },
    {
        name: 'hippo',
        img: 'images/hippo.png',
    },
    {
        name: 'parrot',
        img: 'images/parrot.png',
    },
    {
        name: 'tiger',
        img: 'images/tiger.png',
    },
    {
        name: 'wolf',
        img: 'images/wolf.png',
    },
    {
        name: 'fox',
        img: 'images/fox.png',
    },
    {
        name: 'frog',
        img: 'images/frog.png',
    },
    {
        name: 'hippo',
        img: 'images/hippo.png',
    },
    {
        name: 'parrot',
        img: 'images/parrot.png',
    },
    {
        name: 'tiger',
        img: 'images/tiger.png',
    },
    {
        name: 'wolf',
        img: 'images/wolf.png',
    }
];
cardArray.sort(() => 0.5 - Math.random()); //Advanced: sort the array randomly

const gridDisplay = document.querySelector('#grid'); //'document' is our html file
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    let idNumber = 0; 
    cardArray.forEach(element => {
        const card = document.createElement('img'); //creates an HTML element <img> 
        card.setAttribute('src', 'images/back.png'); //adds the src attribute and fillts it with 'images/...'
        card.setAttribute('data-id', idNumber);
        idNumber++;
        gridDisplay.append(card); //adds the card element to the grid <div> 
        card.addEventListener('click', flipCard);
    });
}
createBoard();

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');//get all the img in the id grid
    const firstChoiceId = cardsChosenIds[0];
    const secondChoiceId = cardsChosenIds[1];
    if (firstChoiceId == secondChoiceId) {
        alert('You have clicked the same image!');
        cards[firstChoiceId].setAttribute('src', 'images/back.png');
        cards[secondChoiceId].setAttribute('src', 'images/back.png');
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        cards[firstChoiceId].setAttribute('src', 'images/done.png');
        cards[secondChoiceId].setAttribute('src', 'images/done.png');
        cards[firstChoiceId].removeEventListener('click',flipCard); //stops listening for clicks
        cards[secondChoiceId].removeEventListener('click',flipCard); //stops listening for clicks
        cardsWon.push(cardsChosen);
    } else {
        cards[firstChoiceId].setAttribute('src', 'images/back.png');
        cards[secondChoiceId].setAttribute('src', 'images/back.png');
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];
    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations, you have won!';
    }
}