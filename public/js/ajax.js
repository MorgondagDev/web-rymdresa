//ajax.js
exports.post = function(endpoint,data){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE) {
			console.log(xmlhttp)
			if (xmlhttp.status == 200) {
				console.log('done!')
			} else if (xmlhttp.status == 400) {
				console.log('There was an error 400')
			} else {
				console.log('something else other than 200 was returned')
			}
		}
	}
	xmlhttp.open("POST", endpoint, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json')
	xmlhttp.send(JSON.stringify(data));
}

exports.get = function(endpoint){
	var promise = new Promise(function(resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				if (xmlhttp.status == 200) {
					resolve(JSON.parse(xmlhttp.response));
				} else if (xmlhttp.status == 400) {
					reject(Error("There was an error 400"));
				} else {
					reject(Error("something else other than 200 was returned"));
				}
			}
		}
		xmlhttp.open("GET", endpoint, true);
		xmlhttp.send();
	});
	return promise
}
