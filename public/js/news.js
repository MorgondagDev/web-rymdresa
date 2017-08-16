import ajax from './ajax'
var newsCount = 5;

exports.request = function(){
	ajax.get('http://morgondag.nu//social.json').then(function(data){
		render(data);
	}, function(err){
		console.log('error',err)
	})
}

function nr(){
	return Math.floor( (Math.random()*3)+1 )
}

function render(data){
	var newsElem = document.querySelector('article#news .content');
	var html = '';
	var n = 0;
	for (var k in data) {
		if(n >=newsCount){
			break;
		}
		html += '<article id="nr'+nr()+'">'
		html += '<a class="mine-link" href="'+data[k].url+'" title="'+data[k].title+'" target="_blank"></a>'
		html += '<a href="'+data[k].url+'" title="'+data[k].title+'" target="_blank">'
		html += '<h2>'+data[k].title+'</h2></a>'
		html += '<a href="'+data[k].url+'" title="'+data[k].title+'" target="_blank">'
		html += '<span class="date">'+data[k].date.d+'-'+ data[k].date.m+'-'+ data[k].date.y+'</span></a>'
		html += '<a href="'+data[k].url+'" title="'+data[k].title+'" target="_blank">'
		html += '<p>'+data[k].content+'</p></a>'
		html += '</article>'
		n ++;
	}
	newsElem.innerHTML = html;
}
