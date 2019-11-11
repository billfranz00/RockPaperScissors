/*
	Functionality Behind Rock, Paper, Scissors
*/

const selectButtons = document.getElementsByClassName("js-select-mode"),
	startContent = document.querySelector(".js-start-game"),
	midContent = document.querySelector(".js-mid-game"),
	endContent = document.querySelector(".js-end-game"),
	optionList = document.querySelector(".js-options"),
	computerType = document.querySelector(".js-computer-type"),
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

let mode,
	timer;

Array.prototype.forEach.call(selectButtons, button => {
	button.addEventListener('click', () => {
		mode = button.value;
		computerType.innerHTML = mode ? "Computer" : "Computer 1";
		userType.innerHTML = mode ? "Player 1" : "Computer 2";
		userMessage.innerHTML =
			mode ? "Choose Your Move! You have 5 seconds or else one will be chosen randomly..."
				: "Computer Gets To Choose";
		chooseMode();
		startContent.style.display = "none";
		midContent.style.display = "";
		optionList.style.display = "";
	});
});

repeatGame.addEventListener('click', () => {
	chooseMode();
	removeButtonCovers();
	midContent.style.display = "";
	endContent.style.display = "none";
})

finishButton.addEventListener('click', () => {
	midContent.style.display = "none";
	optionList.style.display = "none";
	endContent.style.display = "none";
	removeButtonCovers();
	startContent.style.display = "";
});

function finishGame(value) {
	const playerOne = randomNumberGenerator(),
		playerTwo = value ? Number(value) : randomNumberGenerator();

	for (let i = 0; i < options.length; i++) {
		if (playerTwo !== Number(options[i].value)) {
			options[i].parentElement.className += " game__button--dim";
		}
	}

	endGameImg.src = `img/${optionObj[playerOne]}.jpg`;

	const targetUser = mode ? "You " : "Computer 2 ";

	if (playerOne === playerTwo) {
		endGameText.innerHTML = "It's a Tie!!!";
	} else if ((playerTwo - playerOne + 3) % 3 === 1) {
		endGameText.innerHTML = targetUser + "Won!!!";
	} else {
		endGameText.innerHTML = targetUser + "Lost!!!";
	}

	if (value) {
		removeChooseOptionEvent();
	}

	midContent.style.display = "none";
	endContent.style.display = "";
}

function chooseOption() {
	clearInterval(timer);
	finishGame(this.value);
}

function chooseMode() {
	invokeTimer();
	if (!mode) {
		removeChooseOptionEvent();
	}
	else {
		Array.prototype.forEach.call(options, option => {
			option.addEventListener("click", chooseOption);
		});
	}
}

function invokeTimer() {
	let time = 5;
	gameTime.innerHTML = time;
	timer = setInterval(() => {
		time--;
		gameTime.innerHTML = time;
		if (time === 0) {
			finishGame();
			clearInterval(timer);
		}
	}, 1000);
}

function removeChooseOptionEvent() {
	Array.prototype.forEach.call(options, button => {
		button.removeEventListener('click', chooseOption);
	});
}

function removeButtonCovers() {
	for (let i = 0; i < options.length; i++) {
		options[i].parentElement.classList.remove("game__button--dim");
	}
}

function randomNumberGenerator() {
	return Math.floor(Math.random() * 3) + 1;
}