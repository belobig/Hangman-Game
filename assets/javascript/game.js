window.onload = function () {

	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


	var wordList;				// Array of words
	var word;						// Selected word
	var guess;					// Guess
	var guesses = [];		// Stored guesses
	var lives;					// Lives
	var counter;				// Count correct guesses
	var space = 0;					// Number of spaces in word '-'
	var wins = 0;				// Number of wins
	var losses = 0;			// Number of losses
	var winSound;				// Winning Sound variable
	var loseSound;				// Losing sound variable

	// Get elements
	var showLives = document.getElementById("myLives");


	// Create alphabet ul
	var buttons = function () {
		myButtons = document.getElementById('buttons');
		letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.id = 'letter';
			list.innerHTML = alphabet[i];
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}


	// Create guesses ul
	function result() {
		wordHolder = document.getElementById('currentWord');
		correct = document.createElement('ul');

		for (var i = 0; i < word.length; i++) {
			correct.setAttribute('id', 'my-word');
			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
			if (word[i] === "-") {
				guess.innerHTML = "-";
				space += 1;
			} else {
				guess.innerHTML = "_";
			}

			guesses.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	}


	// endGame function
	function endGame() {
		document.getElementById("buttons").style.display = "none";
		document.getElementById("vl").style.height = "300px";
	}

	// Show lives
	function comments() {
		showLives.innerHTML = lives;
		if (lives < 1) {
			showLives.innerHTML = "Game Over. Better luck next time."
			losses++;
			document.getElementById('loss').innerHTML = losses;
			loseSound.play();
			endGame();
		}
		for (var i = 0; i < guesses.length; i++) {
			if (counter + space === guesses.length) {
				showLives.innerHTML = "You Win!";
			}
		}
		if (showLives.innerHTML === "You Win!") {
			wins++;
			document.getElementById('win').innerHTML = wins;
			winSound.play();
			endGame();
		}
	}


	// Animate hangman
	var animate = function () {
		var drawMe = lives;
		drawArray[drawMe]();
	}

	// Hangman
	function canvas() {
		myStickman = document.getElementById("stickman");
		context = myStickman.getContext('2d');
		context.beginPath();
		context.strokeStyle = "#55B2D3";
		context.lineWidth = 3;
	}

	function head() {
		myStickman = document.getElementById("stickman");
		context = myStickman.getContext('2d');
		context.beginPath();
		context.arc(60, 25, 10, 0, Math.PI * 2, true);
		context.stroke();
	}

	function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
		context.moveTo($pathFromx, $pathFromy);
		context.lineTo($pathTox, $pathToy);
		context.stroke();
	}

	function gallows1() {
		draw(0, 150, 150, 150);
	}

	function gallows2() {
		draw(10, 0, 10, 600);
	}

	function gallows3() {
		draw(0, 5, 70, 5);
	}

	function gallows4() {
		draw(60, 5, 60, 15);
	}

	function torso() {
		draw(60, 36, 60, 70);
	}

	function rightArm() {
		draw(60, 46, 100, 50);
	}

	function leftArm() {
		draw(60, 46, 20, 50);
	}

	function rightLeg() {
		draw(60, 70, 80, 120);
	}

	function leftLeg() {
		draw(60, 70, 40, 120);
	}

	drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, gallows4, gallows3, gallows2, gallows1];

	// OnClick Function
	function check() {
		list.onclick = function () {
			var guess = (this.innerHTML);
			this.setAttribute("class", "active");
			this.onclick = null;
			for (var i = 0; i < word.length; i++) {
				if (word[i] === guess) {
					guesses[i].innerHTML = guess;
					counter += 1;
				}
			}
			var j = (word.indexOf(guess));
			if (j === -1) {
				lives -= 1;
				comments();
				animate();
			} else {
				comments();
			}
		}
	}


	//Sound 
	function sound(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
		this.play = function () {
			this.sound.play();
		}
		this.stop = function () {
			this.sound.pause();
		}
	}


	//Play
	function play() {
		wordList = ["ZELDA", "LINK", "EPONA", "GANON", "GANONDORF", "REVALI", "MIPHA", "DARUK", "URBOSA", "PRINCE SIDON", "RIJU", "CHUCHU", "KEESE", "WIZZROBE", "BOKOBLIN", "LIZALFOS", "MOBLIN", "LYNEL", "GUARDIAN", "TALUS", "HINOX", "MOLDUGA", "TRIFORCE", "BOMB", "BOOMERANG", "MASTER SWORD", "GREAT DEKU TREE", "OCARINA", "HYLIAN", "GERUDO", "SHEIKAH", "KOKIRI", "GORON", "ZORA", "DEKU", "KOROK", "DODONGO", "IMPA", "GOHMA", "AGAHNIM", "DAMPE", "MIDNA", "MALO", "TALO", "ZANT", "ILIA", "SKULL KID", "WOLF LINK", "GIRAHIM", "NAVI", "POE", "MAJORA", "LANAYRU", "FAROSH", "DINRAAL", "NAYDRA", "HESTU", "KING RHOAM", "SHEIK", "RUTO", "OOCCOO", "FARORE", "DIN", "VOLVAGIA", "LORD JABU JABU", "TINGLE", "SAGE", "STALFOS", "LEVIATHAN", "COTERA", "KAYASA", "MIJA", "TERA", "GREAT FAIRY", "LOST WOODS", "HAPPY MASK SALESMAN", "KOTAKE", "KOUME", "FARON", "AKKALA", "DUELING PEAKS", "HATENO", "HEBRA", "TABANTHA", "LON LON RANCH", "HYRULE", "LAKE HYLIA", "SHEIKAH EYE", "TEMPLE OF TIME", "BOW", "ARROW", "KOROK SEED", "SHRINE", "STABLE", "RUPEE", "SHEIKAH SLATE", "ANKLE", "KNUCKLE", "BEEDLE", "AGITHA", "CRAZY TRACY", "DARK LINK", "BONOORU", "OCTOROK", "FI", "SCRAPPER", "GROOSE", "DEMISE", "BATREAUX", "KAKARIKO", "BOMBCHU", "HOOKSHOT", "LENS OF TRUTH", "CUCCO", "POTION", "SKULLTULA", "SLINGSHOT", "DEKU NUT", "DEKU SEEDS", "DEKU STICK"];

		winSound = new sound("assets/sounds/lozfanfare.mp3");
		loseSound = new sound("assets/sounds/lozlinkdie.wav");

		document.getElementById("buttons").style.display = "block";
		document.getElementById("vl").style.height = "80%";

		word = wordList[Math.floor(Math.random() * wordList.length)];
		word = word.replace(/\s/g, "-");
		console.log(word);
		buttons();
		

		guesses = [];
		lives = 10;
		counter = 0;
		space = 0;
		result();
		comments();
		canvas();

	}

	play();

	// Reset

	document.getElementById('reset').onclick = function () {
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		context.clearRect(0, 0, 400, 400);
		play();
	}

}