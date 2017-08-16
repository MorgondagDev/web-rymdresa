import ajax from './ajax.js'

var isSigned = false;
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var url,data,form,button,input,ufo;

exports.init = function(){
	/*
	form = document.querySelector('form#signup');
	button = document.querySelector('form#signup input[type=submit]');
	input = document.querySelector('form#signup input[type=email]');
	ufo = document.querySelector('#ufo');
	url = form.getAttribute('action');

	form.addEventListener('submit', function(e){
		e.preventDefault();


		if(input.value.length <= 2){
			return;
		}

		if(isSigned == input.value){
			input.value = 'See you in space!'
			button.value = 'Got it!'
			return;
		}
		isSigned = input.value
		ajax.post('/signup', {mail:input.value})
		ufo.classList.add('signed')
		button.value = 'Thank you!';
		input.value = 'See you in space!'

	})
	*/
}

/*
//app.js
define(['domReady', 'jquery'], function(domReady, $) {

	domReady(function() {
		var isSigned = false;
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

		$('form#signup').on('submit', function(e, t) {
			e.preventDefault();

			if (!isSigned) {

				var url =  $(this).attr('action');
				var data = $(this).serialize();

				$.ajax({
					url: url,
					method: 'POST',
					data: data,
					beforeSend: function(){
						$('form#signup input[type="submit"]').attr('value','Click to Confirm')
					},
				}).success(function(response) {
					isSigned = true;
					console.log('Awesome!', response);
					$('form#signup #signup-mail').attr("disabled", true)
					$('form#signup input[type="submit"]').attr('value','Thank You')
					$('#ufo').addClass('signed')
					$('form#signup')[0].reset()
				}).fail(function(error) {
					isSigned = false;
					$('form#signup input[type="submit"]').attr('value','Try again')
				});

			}

		})
	});
});
*/
