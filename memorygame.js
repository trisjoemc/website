/** @format */

const gameContainer = document.getElementById("game");

let firstFlippedCard = null;
let secondFlippedCard = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	if (noClicking) return;
	if (event.target.classList.contains("flipped")) return;

	let currentCard = event.target;
	currentCard.style.backgroundColor = currentCard.classList[0];

	if (!firstFlippedCard || !secondFlippedCard) {
		//flip the card by adding the "flipped" class
		currentCard.classList.add("flipped");
		firstFlippedCard = firstFlippedCard || currentCard;
		secondFlippedCard = currentCard === firstFlippedCard ? null : currentCard;
	}

	if (firstFlippedCard && secondFlippedCard) {
		// Disable clicking while processing the cards
		noClicking = true;

		//debug
		let flipped1 = firstFlippedCard.classList;
		let flipped2 = secondFlippedCard.classList;

		if (flipped1.contains(flipped2[0])) {
			// if the colors match, update the count and reset variables
			cardsFlipped += 2;
			firstFlippedCard.removeEventListener("click", handleCardClick);
			secondFlippedCard.removeEventListener("click", handleCardClick);
			firstFlippedCard = null;
			secondFlippedCard = null;
			noClicking = false;
		} else {
			// if the colors don't match, flip the cards back after a delay
			console.log("flipping the cards back in one second");
			setTimeout(function () {
				firstFlippedCard.style.backgroundColor = "";
				secondFlippedCard.style.backgroundColor = "";
				firstFlippedCard.classList.remove("flipped");
				secondFlippedCard.classList.remove("flipped");
				firstFlippedCard = null;
				secondFlippedCard = null;
				noClicking = false;
			}, 1000);
		}
	}

	if (cardsFlipped === COLORS.length) {
		// if all cards are flipped, display a game over alert
		alert("Game Over!");
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
.