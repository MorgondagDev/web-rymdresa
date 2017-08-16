var skillpoints = 35,
	indexed = 0,
	icons, count, lis, skillup;


exports.init = function() {

	icons = document.querySelectorAll('.skill-icon');
	count = document.querySelector('.skillpoints .count')
	skillup = document.querySelectorAll('.skillup');
	lis = document.querySelectorAll('#pilot-skills li');

	for (var i = 0; i < icons.length; i++) {
		icons[i].addEventListener('click', function(e) {
			var elem = e.target;
			indexed = parseInt(elem.parentElement.getAttribute('data-id'), 10) + 1
			if (skillpoints > 0) {
				addSkill(indexed);
			}
		})
	}
	document.querySelector('#reset-skills').addEventListener('click', reset)

}

function addSkill(index) {
	skillpoints -= 1;
	count.innerHTML = skillpoints;
	var counter = lis[index].querySelector('.count');

	counter.innerHTML = parseInt(counter.innerHTML, 10) + 1
	var current = lis[index].querySelector('.count').innerHTML;
	updateSkills(index);
}

function updateSkills(index) {
	var target = ''
	var multiplier = 0;
	var value = 0;

	for (var i = 0; i < skillup.length; i++) {

		if (skillup[i].getAttribute('data-target') == index) {
			skillup[i].parentElement.parentElement.classList.add('active')
			var count = parseInt(lis[index].querySelector('.count').innerHTML)
			var multiplier = parseFloat(skillup[i].getAttribute('data-per'), 10);
			skillup[i].innerHTML = (count * multiplier).toFixed(2);

		} else {
			skillup[i].parentElement.parentElement.classList.remove('active')


		}
	}
}

function reset(e) {
	skillpoints = 35
	for (var i = 0; i < lis.length; i++) {
		if (i == 0) {
			lis[i].querySelector('.count').innerHTML = 35;
		} else {
			lis[i].querySelector('.count').innerHTML = 0;
		}
	}
	for (var x = 0; x < skillup.length; x++) {
		skillup[x].innerHTML = '0.00'
		skillup[x].parentElement.parentElement.classList.remove('active')
	}
}
