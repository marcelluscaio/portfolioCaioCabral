const notAlphaNumeric = /[^A-Za-z0-9]/g;

function normalizeString(str: string) {
	return str.replace(notAlphaNumeric, "").toLowerCase();
}

export { normalizeString };
