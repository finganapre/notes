const genUNIXTime = function(){
	let date = Math.round(new Date().getTime()/1000.0);
	return date;
}

module.exports = genUNIXTime;