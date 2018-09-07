var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION)
	}

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	}

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	}

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;

		this.onClick(this.key)
		this.play()
		Simon(this.key);
	}.bind(this)

	boxEl.addEventListener('mousedown', this.clickHandler);
}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.
var notes = {};

KEYS.forEach(function (key) {
	notes[key] = new NoteBox(key);
});



//KEYS.concat(KEYS.slice().reverse()).forEach(function(key, i) {
//	setTimeout(notes[key].play.bind(null, key), i * NOTE_DURATION);
//});

var playlist = [];  //List of note keys generated
var playerlist = []; //List of note keys played by player

//Plays sequence of notes generated in playlist
function PlayNotes() {
	setTimeout(function(){
	playlist.forEach(function(key, i) {
		setTimeout(notes[key].play.bind(null, key), i * NOTE_DURATION)});
	}, 2000);
}

//Randomly generates a new note key and adds to playlist
function NoteGenerator(){
	var num = Math.floor(Math.random() * Object.keys(notes).length);
	//how to find dictionary length: https://stackoverflow.com/questions/3337367/checking-length-of-dictionary-object
	if (num == 0){
		var key = 'c';
	}else if (num == 1){
		var key = 'd';
	}else if (num == 2){
		var key = 'e';
	}else {
		var key = 'f';
	}
	playlist.push(key);
}

//keeps track of how many notes played correctly in a sequence
var counter = 0; 

//keeps track of player score
var score = 0; 

//displays score on webpage
var out = document.getElementById("score");
out.innerHTML = score.toString(); //.innerHTML: https://stackoverflow.com/questions/40858456/how-to-display-a-javascript-var-in-html-body

//for every player turn, keeps track of if player plays sequence correctly
//generates new note and plays sequence if players plays correctly
//resets and starts new game if played incorrectly
function Simon(key){
	playerlist.push(key);
	if (playerlist[counter] == playlist[counter]){
		counter++;
		console.log(playerlist.length);
		if (playerlist.length == playlist.length){
			score++;
			out.innerHTML = score.toString();
			counter = 0;
			playerlist = [];
			NoteGenerator();
			PlayNotes();
			//waits to play new sequence after the last note played by player stops
		}
	}
	else{
		counter = 0;
		score = 0;
		out.innerHTML = score.toString();
		playlist = [];
		playerlist = [];
		NoteGenerator();

		PlayNotes();

	}

}
NoteGenerator(); //generates first note when loading page
PlayNotes();

