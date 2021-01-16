//Variable Declaration
var score = 0;
var round = 1;
var sliderValue = 0;
var target = 0;
updateScoreAndRound();
generateAndSetRandomNo();

//Random No Generation
function generateAndSetRandomNo() {
	target = Math.floor(Math.random() * 101);
	document.getElementById("target-value").innerHTML = target;
}

let slider = document.getElementById("sliderID");

slider.oninput = function () {
	sliderValue = this.value;
	// console.log(sliderValue);
};

document.getElementById("hitmebutton").onclick = function () {
	checkHitValue(sliderValue);
};

function checkHitValue(value) {
	// console.log(value);
	if (value == target) {
		//== because of value coming from slider is a string and not a number
		// console.log("100% Hit");
		document.getElementById("custom-id").innerHTML =
			'<p id="bullsEye-info-title">🎯It was an awesome HIT!!!🔫🎯</p>';
		// When the user clicks on the button, open the modal for successful hit.
		modal.style.display = "block";

		round++;
		score = score + finalScore();
		updateScoreAndRound();
	} else {
		if (score === 0) {
			round++;
			updateScoreAndRound();
			// console.log("0% Hit");
		} else {
			score = score + finalScore() - 100;
			round++;
			updateScoreAndRound();
			// console.log("0% Hit");
		}
		// showing the user his hit  status.
		document.getElementById("custom-id").innerHTML =
			'<p id="bullseye-failed-target">You had a hit at</p>' + " " + value;

		document.getElementById("custom-id").innerHTML +=
			'<p id="bullsEye-info-title">Sorry,You Missed It.😕</p>';

		document.getElementById("custom-id").innerHTML +=
			'<p id="try-again">Please try again😄</p>';
		// When the user clicks on the button, open the modal for failed hit.
		modal.style.display = "block";
	}
}

//Updating Score Info
function updateScoreAndRound() {
	document.getElementById("score").innerHTML = score;
	document.getElementById("round").innerHTML = round;
	generateAndSetRandomNo();
}

//Calculating Points Earned in Each Round
function pointsEarnedInRound() {
	var difference = 0;
	if (target > sliderValue) {
		difference = target - sliderValue;
	} else if (target < sliderValue) {
		difference = sliderValue - target;
	} else {
		difference = 0;
	}
	return 100 - difference;
}

//Calculating Bonus Points Earned in Each Round
function extraPointsEarnedInRound() {
	let bonusPoints = 0;
	let awardedPoints = pointsEarnedInRound();
	if (awardedPoints === 100) {
		bonusPoints = 100;
	} else if (awardedPoints == 99) {
		bonusPoints = 50;
	} else {
		bonusPoints = 0;
	}
	return bonusPoints;
}

//Calculating Final Score
function finalScore() {
	return pointsEarnedInRound() + extraPointsEarnedInRound();
}

//Returns the appropriate Popup Title depending on the pointsEarnedInRound
function popupTitle() {
	let points = pointsEarnedInRound();
	let title = "";
	if (points > 95) {
		title = "Excellent";
	} else if (points >= 90 && points < 95) {
		title = "Very Good";
	} else if (points >= 80 && points < 90) {
		title = "Try once More";
	} else {
		title = "Not even Close";
	}
	return title;
}

//Start over Button
document.getElementById("startOver").onclick = function () {
	location.reload();
};

//fetching modal div-id
var modal = document.getElementById("divModal");

// Get the button that opens the modal
var infoAboutBtn = document.getElementById("infoBtn");
var hitMeButton = document.getElementById("hitmebutton");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks on the button, open the modal for info-button
infoAboutBtn.onclick = function () {
	document.getElementById("custom-id").innerHTML =
		'<p id="bullsEye-info-title">🎯BullsEye🎯</p>';
	document.getElementById("custom-id").innerHTML +=
		"<p>This is BullsEye , a game where u can win points and earn fame by dragging a slider.</p>";
	document.getElementById("custom-id").innerHTML +=
		"<p>Your goal is to place the slider as close as possible to the target value. The closer you are the more points you score.</p>";

	document.getElementById("custom-id").innerHTML += "<p>😄Enjoy!!😄</p>";
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
