import type { GenericElement, Links } from "../types/menuEngine";

class Menu {
	buttonParent;
	button;
	menu;
	links;
	isFocusable = document.querySelectorAll("a, button");
	focusableNotLinks;
	isOpen = false;
	isDesktop;

	constructor(buttonParent: GenericElement, menu: GenericElement, links: Links) {
		this.buttonParent = buttonParent;
		this.button = buttonParent?.querySelector(".burger-button button");
		this.menu = menu;
		this.links = links;
		this.focusableNotLinks = this.linksNotMenu();
		this.isDesktop =
			this.buttonParent && getComputedStyle(this.buttonParent).display === "none";

		this.buttonParent?.addEventListener("click", () => this.toggleMenu());

		this.links?.forEach((link) =>
			link.addEventListener("click", () => this.closeMenu()),
		);
	}

	toggleMenu() {
		this.toggleIsOpen();
		this.updateSettings();
	}

	closeMenu() {
		if (!this.isDesktop) {
			this.closeIsOpen();
			this.updateSettings();
		}
	}

	closeIsOpen() {
		this.isOpen = false;
	}

	toggleIsOpen() {
		this.isOpen = !this.isOpen;
	}

	updateSettings() {
		this.updateMenuClass();
		this.setTabindex();
		this.updateAriaExpanded();
	}

	updateMenuClass() {
		if (this.isDesktop) {
			this.menu?.classList.remove("open");
		} else if (!this.isDesktop && this.isOpen) {
			this.menu?.classList.add("open");
		} else if (!this.isDesktop && !this.isOpen) {
			this.menu?.classList.remove("open");
		}
	}

	setTabindex() {
		if (this.isDesktop) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "0"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "0"));
		} else if (!this.isDesktop && this.isOpen) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "0"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "-1"));
			this.button && this.button.setAttribute("tabindex", "0");
		} else if (!this.isDesktop && !this.isOpen) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "-1"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "0"));
		}
	}

	updateAriaExpanded() {
		this.button?.setAttribute("aria-expanded", this.isOpen.toString());
	}

	updateOnLoadAndResize() {
		if (this.buttonParent) {
			this.isDesktop = getComputedStyle(this.buttonParent).display === "none";

			this.isDesktop ? this.setDesktopView() : this.setMobileView();
		}
	}

	setDesktopView() {
		this.closeIsOpen();
		this.updateSettings();
	}

	setMobileView() {
		this.setTabindex();
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
