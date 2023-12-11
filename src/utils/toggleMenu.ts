type NonSpecificElement = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;
type FocusableElements = NodeListOf<Element> | undefined;
type Tabindex = "0" | "-1";

function toggleMenu(
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	menu?.classList.toggle("open");

	const tabindex = defineTabindex(menu);

	setTabindex(links, tabindex);

	toggleFocusTrap(focusableElements, tabindex);
}

function defineTabindex(menu: NonSpecificElement) {
	return menu?.classList.contains("open") ? "0" : "-1";
}

function setTabindex(links: Links | Element[], number: Tabindex) {
	links?.forEach((link) => link.setAttribute("tabindex", number));
}

function toggleFocusTrap(focusableElements: Element[], number: Tabindex) {
	const invertedNumber = number === "0" ? "-1" : "0";
	setTabindex(focusableElements, invertedNumber);
}

function updateOnLoadAndResize(
	buttonParent: NonSpecificElement,
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	buttonParent && getComputedStyle(buttonParent).display === "none"
		? setDesktopView(menu, links, focusableElements)
		: setTabindex(links, "-1");
}

function setDesktopView(
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	removeClassOpen(menu);
	setTabindex(links, "0");
	removeFocusTrap(focusableElements);
}

function removeClassOpen(menu: NonSpecificElement) {
	menu?.classList.remove("open");
}

function closeMenu(
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	removeClassOpen(menu);
	setTabindex(links, "-1");
	removeFocusTrap(focusableElements);
}

function removeFocusTrap(focusableElements: Element[]) {
	setTabindex(focusableElements, "0");
}

function focusableNotLinks(focusableElements: FocusableElements, links: Links) {
	const elements = [];
	if (focusableElements && links) {
		for (let i = 0; i < focusableElements.length; i++) {
			for (let j = 0; j < links.length; j++) {
				if (focusableElements[i] === links[j]) {
					break;
				}
				if (j === links.length - 1) {
					elements.push(focusableElements[i]);
				}
			}
		}
	}

	return elements;
}

export { toggleMenu, updateOnLoadAndResize, focusableNotLinks, closeMenu };
