//import ws from './ws.js'

import fb from './fb.js'
import ga from './ga.js'

import quote from './quote.js'
import slideshow from './slideshow.js'
import skills from './skills.js'
import video from './video.js'
import signup from './signup.js'
import splashwords from './splashwords';
import news from './news';
//import news from './news';

window.addEventListener('DOMContentLoaded', function() {
	news.request();
	splashwords.init();
	quote.init();
	slideshow.init();
	skills.init();
	video.init();
	signup.init();
	fb.init();
});

//news.request();
