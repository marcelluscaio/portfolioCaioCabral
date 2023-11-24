import type { HeadingLevel } from "../types/headingLevel.ts";

function generateChildHeading(parentHeading: HeadingLevel) {
	const parentLevelInteger = parseInt(parentHeading.slice(-1));
	//@ts-ignore
	const childHeading: HeadingLevel = `h${parentLevelInteger + 1}`;

	return childHeading;
}

export { generateChildHeading };
