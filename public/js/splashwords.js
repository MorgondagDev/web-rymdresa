var words = [
	"Exploring the unknown",
	"RougeLike elements",
	"Space!",
	"Loneliness",
	"RPG elements",
	"An infinite world",
	"Science fiction references",
	"Procedurally generated world",
	"Space flight",
	"Over 300 objects to explore",
	"Retro textbased bosses",
	"Producually generated equipment",
	"Pilot levelup system",
	"3 chapters",
	"Textbased year events",
	"8 unlockable ships",
	'Surviving in space',
	'Relaxing time in space',
	'Your death in space',
	'Peacefullness',
	'Poetry in space',
	'Pixelart',
	'A hazard environment',
	'A lonely space odyssey',
	'Different missions',
	'Random loot',
	'Voiced story',
	'A mysterious cosmos',
	'Survive',
	'Randomness',
	'Explore',
	'Discover the solitude of space',
	'Powerful items',
	'The diary from a pilot',
	'Textbased exploration',
	'Loneliness',
	'Cinematics',
	'Open space',
	'Space is an unforgiving place',
	'Travel stats',
	'A poetic narrative',
	'An abstract experience',
	'100 zones to discover',
	'Original soundtrack',
	'Nonviolence',
	'The evil stars',
	'Unique artstyle',
	'A lonely spacepilot',
	'Unlockable researches',
	'A new home',
	'Retro soundeffects',
	'Textbased adventure',
	'A journey'
]

var TIMER  = 1000;
var elem;
var current = 0;

exports.init = function(){

	if(window.innerWidth < 950){
		return;
	}

	elem = document.querySelector('.splash-words .experience');
	words = shuffle(words);
	setWord();

}

function fadeOut(){
	elem.classList.add('fade')
	setTimeout(function() {
		setWord()
	}, 500);
}

function fadeIn(){
	elem.classList.remove('fade')
	setTimeout(function() {
		fadeOut();
	}, 1000);
}

function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function setWord(){
	elem.innerHTML = words[current];
	current += 1;
	if (current >= words.length) {
		current = 0;
		words = shuffle(words);
	}
	fadeIn()
}
