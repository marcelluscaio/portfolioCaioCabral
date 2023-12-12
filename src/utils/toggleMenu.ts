type GenericElement = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;

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

		this.links?.forEach((link) =>
			link.addEventListener("click", () => this.closeMenu()),
		);

		this.buttonParent?.addEventListener("click", () => this.toggleMenu());
	}

	updateOnLoadAndResize() {
		if (this.buttonParent) {
			this.isDesktop = getComputedStyle(this.buttonParent).display === "none";

			this.isDesktop ? this.setDesktopView() : this.setMobileView();
		}
	}

	setDesktopView() {
		this.removeMenuClassOpen();
		this.setTabindex();
		this.updateAriaExpanded();
	}

	setMobileView() {
		this.setTabindex();
	}

	removeMenuClassOpen() {
		this.menu?.classList.remove("open");
		this.isOpen = false;
	}

	setTabindex() {
		if (this.isDesktop) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "0"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "0"));
		} else if (!this.isDesktop && this.isOpen) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "0"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "-1"));
		} else if (!this.isDesktop && !this.isOpen) {
			this.links?.forEach((link) => link.setAttribute("tabindex", "-1"));
			this.focusableNotLinks.forEach((item) => item.setAttribute("tabindex", "0"));
		}
	}

	toggleMenu() {
		this.menu?.classList.toggle("open");
		this.isOpen = !this.isOpen;

		this.setTabindex();

		this.updateAriaExpanded();
	}

	updateAriaExpanded() {
		this.button?.setAttribute("aria-expanded", this.isOpen.toString());
	}

	closeMenu() {
		if (!this.isDesktop) {
			this.removeMenuClassOpen();
			this.setTabindex();
			this.updateAriaExpanded();
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
