var left, ul, listelems, count, current, href, title, lang,quoteElem;
var TIMER = 3500;

exports.init = function() {

	left = document.querySelector('#left');
	ul = document.querySelector('.press ul');
	listelems = document.querySelectorAll('.press ul li');

	count = listelems.length;
	current = Math.floor(Math.random() * count);
	quoteElem = document.querySelector('.quotemachine');
	href = document.querySelector('.quotemachine a');
	title = document.querySelector('.quotemachine h3');
	lang = document.querySelector('.quotemachine .lang');
	displayQuote();
	setInterval(displayQuote,TIMER);
}

function displayQuote() {
	current = Math.floor(Math.random() * count);
	update(current);

}

function getLang(index) {
	var lang = listelems[index].innerHTML
	if (lang.indexOf("(") != -1) {
		return lang.replace(/.*\(|\)/gi, '');
	} else {
		return 'English';
	}
}

function getTitle(index) {
	var title = listelems[index].innerText;

	if (title.indexOf("(") != -1) {
		title = title.split(/(\([^)]+\))/)[0]
		return title;
	} else {
		return title;
	}
}

function getHref(index) {
	return listelems[index].querySelector('a').getAttribute('href')
}

function update(index) {
	for (var i = 0; i < listelems.length; i++) {
		listelems[i].classList.remove('active');
	};
	listelems[index].classList.add('active');

	if(window.getComputedStyle(quoteElem).getPropertyValue('display') !== 'none'){
		href.setAttribute('href', getHref(index))
		lang.innerHTML = getLang(index)
		title.innerHTML = '<span>{[ </span>' + getTitle(index) + '<span> ]}</span>'
	}

}
