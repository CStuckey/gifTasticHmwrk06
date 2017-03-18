$(document).ready(function(){
	//Game object
var triviaGame = {

	// Array to hold questions and answers
	qAndA: [{
		question: "How do prevailing winds that travel across large bodies of water affect the climate?",
			ans1: "They make it colder",
			ans2: "They make it warmer",
			ans3: "They make it wetter",
			ans4: "They make it drier"},
	{
		question: "Wind will generally carry the most moisture when it comes from",
			ans1: "warm grasslands",
			ans2: "warm tropical seas",
			ans3: "polar icecaps",
			ans4: "mountainous regions"},
	{
		question: "The windward side of a mountain usually",
			ans1: "is a desert",
			ans2: "has no precipitation",
			ans3: "is lush and green",
			ans4: "has warm, sinking air"},
	{
		question: "Prevailing winds that travel to a region across a large body of water would probably make the region’s climate",
			ans1: "warmer",
			ans2: "wetter",
			ans3: "cooler",
			ans4: "drier"},
	{
		question: "What kind of weather does a cold front usually bring?",
			ans1: "warm",
			ans2: "stormy",
			ans3: "sunny",
			ans4: "windy"},
	{
		question: "Which describes an altocumulus cloud?",
			ans1: "high, feathery cloud",
			ans2: "puffy mid-level cloud",
			ans3: "low storm cloud",
			ans4: "high cloud made of ice crystals"}],

// Array to hold the correct answers
	correctAnswers: ['They make it wetter', 'warm tropical seas', 'is lush and green', 'wetter', 'stormy', 'puffy mid-level cloud'],
	userAnswers: [],

	questionCount: 0, // Why does this need to exist?
	beginInt: 0,

	timer: 15,  		// These are the kind of random objects that I don't realize that I need to create
	btnclicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnanswered: 0,

beginG: function() {
	if(triviaGame.questionCount === triviaGame.qAndA.length){
		triviaGame.gameFinished();
		triviaGame.timer = 15;
	} else {
		if (triviaGame.questionCount >= 1){
			clearInterval(triviaGame.displayNextInt);
			$('#gameStart').show();
			$('#divAnswers').hide();
			triviaGame.timer = 15;
			$('#time').html(triviaGame.timer);
		} 

		$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
		$('.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
		$('.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
		$('.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
		$('.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);
		
		triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);
		
	}

},
// Count down timer
	countDown: function() {
		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer === 0) {
			triviaGame.outOfTime();
		} else if(triviaGame.btnclicked === true && triviaGame.correctAnswers[triviaGame.questionCount] === triviaGame.userAnswers[triviaGame.questionCount]){
			triviaGame.answersCorrect();
		} else if(triviaGame.btnclicked === true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){
			triviaGame.answersWrong();
		}

	},

// If options chosen by player are correct
	answersCorrect: function() {
		$("#divAnswers").show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();
		$('.radio-inline').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		triviaGame.btnclicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginG, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;

		// triviaGame.userAnswers.push("");
	},

// if options by player are incorrect
	answersWrong: function() {
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginG, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},	

// When the player is out of time
	outOfTime: function() {
		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginG, 1000);

		triviaGame.questionCount++;
	},

// Restart function
	restart: function() {
		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("15");

		triviaGame.beginG();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},	

// Trivia game ends - reset the DOM
	gameFinished: function() {
		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 15;
	}

}; // Closing bracket for triviaGame	

// Game begins when player clicks the start button
	$('#start').on('click', function(){
		$('button#start').hide();
		$('#gameStart').css('display', 'block');
		$('button#start').css('display', 'block');
		$('.questions').html(triviaGame.beginG);
	});

// Player hits options
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//once the player hits restart - calls function restart
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});	

}); // Document closing bracket