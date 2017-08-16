var ws = false;

var init = function(){
	ws = new WebSocket('ws://' + window.location.host);
	ws.onopen = function() {
		console.log('welcome!');
	}

	ws.onmessage = function(msg) {
		handelMessages(JSON.parse(msg.data))
	}
}



function handelMessages(data){
	if(typeof data.type == 'undefined'){
		return;
	}
	switch(data.type){
		case 'connection':
			handleConnection(data.content)
		break;
	}
}

function handleConnection(data){
	var elem = document.querySelector('article#pilot #xp span');
	var count = parseInt(elem.innerHTML.replace('Level ',''),10);
	if(data === 'connected'){
		elem.innerHTML = 'Level '+(count +1);
	} else if(data === 'disconnected'){
		elem.innerHTML = 'Level '+(count -1);
	}
}



exports.init = init;

exports.ws = function(){
	return ws;
}

exports.send = function(type,content){
	var data = {
		type: type,
		content:content
	}
	ws.send(JSON.stringify(data));
}

