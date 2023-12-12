type NonSpecificElement = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;
type FocusableElements = NodeListOf<Element> | undefined;
type Tabindex = "0" | "-1";

class Menu {
	buttonParent;
	button;
	menu;
	links;
	isFocusable = document.querySelectorAll("a, button");
	focusableNotLinks;
	isOpen = false;

	constructor(
		buttonParent: NonSpecificElement,
		menu: NonSpecificElement,
		links: Links,
	) {
		this.buttonParent = buttonParent;
		this.button = buttonParent?.querySelector(".burger-button button");
		this.menu = menu;
		this.links = links;
		this.focusableNotLinks = this.linksNotMenu();

		this.links?.forEach((link) =>
			link.addEventListener("click", () => this.closeMenu()),
		);
	}

	updateOnLoadAndResize() {
		if (this.buttonParent) {
			getComputedStyle(this.buttonParent).display === "none"
				? this.setDesktopView()
				: this.setTabindex(this.links, "-1");
		}
	}

	setDesktopView() {
		this.removeClassOpen();
		this.setTabindex(this.links, "0");
		this.removeFocusTrap();
		this.removeAriaExpanded();
	}

	removeClassOpen() {
		this.menu?.classList.remove("open");
	}

	setTabindex(targetGroup: Links | Element[], number: Tabindex) {
		targetGroup?.forEach((target) => target.setAttribute("tabindex", number));
	}

	removeFocusTrap() {
		this.setTabindex(this.focusableNotLinks, "0");
	}

	removeAriaExpanded() {
		if (this.button) {
			this.button.setAttribute("aria-expanded", "false");
		}
	}

	toggleMenu() {
		this.menu?.classList.toggle("open");

		const tabindex = this.defineTabindex();

		this.setTabindex(this.links, tabindex);

		this.toggleFocusTrap(this.focusableNotLinks, tabindex);

		this.updateAriaExpanded();
	}

	defineTabindex() {
		return this.menu?.classList.contains("open") ? "0" : "-1";
	}

	toggleFocusTrap(focusableElements: Element[], number: Tabindex) {
		const invertedNumber = number === "0" ? "-1" : "0";
		this.setTabindex(focusableElements, invertedNumber);
	}

	updateAriaExpanded() {
		if (this.button) {
			const expandedAsBoolean = this.button.getAttribute("aria-expanded") === "true";
			const newValue = !expandedAsBoolean;
			this.button.setAttribute("aria-expanded", newValue.toString());
		}
	}

	closeMenu() {
		if (
			this.buttonParent &&
			getComputedStyle(this.buttonParent).display !== "none"
		) {
			this.removeClassOpen();
			this.setTabindex(this.links, "-1");
			this.removeFocusTrap();
			this.removeAriaExpanded();
		}
	}

	linksNotMenu() {
		const elements = [];
		if (this.isFocusable && this.links) {
			for (let i = 0; i < this.isFocusable.length; i++) {
				for (let j = 0; j < this.links.length; j++) {
					if (this.isFocusable[i] === this.links[j]) {
						break;
					}
					if (j === this.links.length - 1) {
						elements.push(this.isFocusable[i]);
					}
				}
			}
		}

		return elements;
	}
}

export { Menu };
