/*
	Functionality Behind Rock, Paper, Scissors
*/

const selectButtons = document.getElementsByClassName("js-select-mode"),
	startContent = document.querySelector(".js-start-game"),
	midContent = document.querySelector(".js-mid-game"),
	endContent = document.querySelector(".js-end-game"),
	optionList = document.querySelector(".js-options"),
	userType = document.querySelector(".js-user-type"),
	userMessage = document.querySelector(".js-user-message"),
	options = document.getElementsByClassName("js-choose-option"),
	endGameText = document.querySelector(".js-end-game-text"),
	endGameImg = document.querySelector(".js-end-game-img"),
	gameTime = document.querySelector(".js-game-time"),
	repeatGame = document.querySelector(".js-repeat-game"),
	finishButton = document.querySelector(".js-finish-game"),
	optionObj = {
		1: "rock",
		2: "paper",
		3: "scissors"
	};

let mode;

Array.prototype.forEach.call(selectButtons, button => {
	button.addEventListener('click', () => {
		mode = button.value;
		startGame();
		userType.innerHTML = mode ? "Player" : "Computer";
		userMessage.innerHTML = mode ? "Choose Your Move" : "Computer Gets To Choose";
		console.log(mode);
		if (!mode) {
			let time = 5;
			gameTime.innerHTML = time;
			const timer = setInterval(() => {
				time--;
				gameTime.innerHTML = time;
				if (time === 0) {
					finishGame();
					clearInterval(timer);
				}
				console.log(time);
			}, 1000);
		}
		else {
			Array.prototype.forEach.call(options, option => {
				option.addEventListener("click", () => {
					for (let i = 0; i < options.length; i++) {
						if (option.value !== options[i].value) {
							options[i].parentElement.className += " game__button--dim";
						}
					}
					finishGame(option.value);
				});
			});
		}
	});
});

repeatGame.addEventListener('click', () => {
	midContent.style.display = "";
	endContent.style.display = "none";
	for (let i = 0; i < options.length; i++) {
		options[i].parentElement.classList.remove("game__button--dim");
	}
})

finishButton.addEventListener('click', () => {
	startContent.style.display = "";
	midContent.style.display = "none";
	optionList.style.display = "none";
	endContent.style.display = "none";
	for (let i = 0; i < options.length; i++) {
		options[i].parentElement.classList.remove("game__button--dim");
	}
});

function startGame() {
	startContent.style.display = "none";
	midContent.style.display = "";
	optionList.style.display = "";
}

function finishGame(value) {
	const playerOne = randomNumberGenerator(),
		playerTwo = value ? Number(value) : randomNumberGenerator();

	console.log("Player One had " + optionObj[playerOne]);
	console.log("Player Two had " + optionObj[playerTwo]);

	endGameImg.src = `img/${optionObj[playerOne]}.jpg`;

	if (playerOne === playerTwo) {
		endGameText.innerHTML = "It's a Tie!!!";
	} else if ((playerTwo - playerOne + 3) % 3 === 1) {
		endGameText.innerHTML = "You Win!!!";
	} else {
		endGameText.innerHTML = "You Lose!!!";
	}

	midContent.style.display = "none";
	endContent.style.display = "";
}

function randomNumberGenerator() {
	return Math.floor(Math.random() * 3) + 1;
}

function invokeTimer() {
	
}