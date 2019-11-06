/*
	Functionality Behind Rock, Paper, Scissors
*/

const pvcButton = document.querySelector(".js-pvc-button"),
			cvcButton = document.querySelector(".js-cvc-button"),
			startContent = document.querySelector(".js-start-game"),
			midContent = document.querySelector(".js-mid-game"),
			endContent = document.querySelector(".js-end-game"),
			optionList = document.querySelector(".js-choose-option"),
			userType = document.querySelector(".js-user-type"),
			userMessage = document.querySelector(".js-user-message");

pvcButton.addEventListener('click', () => {
	startGame();
	userType.innerHTML = "Player"
	userMessage.innerHTML = "Choose Your Move";
});

cvcButton.addEventListener('click', () => {
	startGame();
	userType.innerHTML = "Computer";
	userMessage.innerHTML = "Computer Gets To Choose";
});

function startGame() {
	startContent.style.display = "none";
	midContent.style.display = "";
	optionList.style.display = "";
}