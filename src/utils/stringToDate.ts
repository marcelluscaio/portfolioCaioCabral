function stringToDate(str: string) {
	const dateParts = str.split("/");
	const year = parseInt(dateParts[2]);
	const month = parseInt(dateParts[1]) - 1;
	const day = parseInt(dateParts[0]);
	const dateObject = new Date(year, month, day);
	return dateObject;
}

export { stringToDate };
