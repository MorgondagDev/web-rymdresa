var s,slideshow,size,len,isLoopPause,loop,lis;
var TIMEOUT = 2000;


exports.init = function(){
	s = 1;
	size = 884;
	slideshow = document.querySelector('ul#slideshow');
	lis = slideshow.querySelectorAll('li')
	len = lis.length;

	slideshow.style.width = size*len+'px';
	isLoopPause = false;
	loop();
}

function loop(){
	if(!isLoopPause){
		slideshow.classList.add('animate');
		if(s < len){
			slideshow.style.marginLeft= -size*s+'px';
			s++;
		} else {
			slideshow.classList.remove('animate');
			slideshow.style.marginLeft = '0px'
			s = 1;
			setTimeout(function(){
				slideshow.classList.add('animate');
				slideshow.style.marginLeft = -size+'px'
			},1)
		}
	}
	setTimeout(function(){
		loop();
	},TIMEOUT)

}
