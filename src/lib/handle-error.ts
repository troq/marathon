const handleError = e => {
	console.error('-------------------------------------');
	console.error(
		'Something went wrong loading Marathon. Please take a screenshot of these details:'
	);
	console.error(e.stack);
	console.error('-------------------------------------');
};

export default handleError;
