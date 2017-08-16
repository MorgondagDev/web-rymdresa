var travel, body, bigplayer, overlay, content, attr, videoLinks;

exports.init = function() {

	body = document.querySelector('body');
	travel = document.querySelector('#travel');

	travel.addEventListener('click', function() {
		if (travel.classList.contains('active')) {
			travel.classList.remove('active')
			body.classList.remove('travel')
		} else {
			travel.classList.add('active')
			body.classList.add('travel')
		}
	});

	bigplayer = document.querySelector('#bigplayer')
	overlay = document.querySelector('#overlay')
	content = document.querySelector('#content')
	attr = '?autoplay=1&rel=0&iv_load_policy=3&color=white&autohide=1&vq=hd1080'

	overlay.addEventListener('click', function() {
		content.innerHTML = ''
		bigplayer.classList.add('hidden')
	});
	videoLinks = document.querySelectorAll('#video a');

	for (var i = 0; i < videoLinks.length; i++) {
		videoLinks[i].addEventListener('click', function(e) {
			e.preventDefault();
			var elem = e.target;
			var href = elem.getAttribute('href');

			if(href !== 'string'){
				console.log('href is missing', elem, elem.parentElement, href)
				href = elem.parentElement.getAttribute('href');
				console.log('new heref',href)
			}

			bigplayer.classList.remove('hidden')
			content.innerHTML = ('<iframe src="' + href + attr + '" frameborder="0" allowfullscreen></iframe>');

		});
	};



}

/*
//video.js
define(['domReady', 'jquery'], function(domReady, $) {
	domReady(function() {

		$('#travel').on('click', function(e,t){
			e.preventDefault();
			$( "body" ).toggleClass( "travel" )
			$( "#travel" ).toggleClass( "active" )
		});

		setTimeout(function() {
			if(console.clear){
				console.clear()
				console.log('Hello space travelers!\n\nSend us a tweet! @rymdresa\nTalk to the man behind all of the code: @kim_gunnarsson\nOr look into the lovely eyes of @vemdel')
			}
		}, 200);


		var bigplayer = $('#bigplayer')
		var overlay = $('#overlay')
		var content = $('#content')
		var attr= '?autoplay=1&rel=0&iv_load_policy=3&color=white&autohide=1&vq=hd1080'

		$('#overlay').on('click', function(){
			content.html('')
			bigplayer.addClass('hidden')
		});

		$('#video a').on('click', function(e){
			e.preventDefault();
			bigplayer.removeClass('hidden')
			content.html('<iframe src="'+$(this).attr('href')+attr+'" frameborder="0" allowfullscreen></iframe>');
		});
	});
});
*/