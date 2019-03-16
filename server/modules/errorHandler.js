module.exports = (res, error, status) => {
	res.status(status || 500).json({
		success: false,
		message: error.message ? error.message : error
	});
}