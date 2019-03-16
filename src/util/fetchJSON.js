function fetchJSON(url, callback) {
	fetch(url)
		.then(res => {
			return res.json();
		}).then(data => {
		callback(data)
	}).catch((e) => {
		console.log(e.message);
	});
}

export {fetchJSON}
