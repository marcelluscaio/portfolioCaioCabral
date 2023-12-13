# My Portfolio

My portfolio portrays some of my projects and articles.

## Purpose

I created this project so companies and hiring managers can easily understand my experience and skills.

## Technologies

I used Astro 4, Sass, TypeScript and Zod on this project.

Astro is great for content websites, and I used many of its features:

- Static Site Generation
- Layouts
- Routing
- Font and image optimization
- Content collections
- CSS Scoping

There are many things for which we do not need Sass anymore, since CSS has incorporated many of them. However, I still used Sass for some of its unique features, like:

- @mixins
- @extends

TypeScript and Zod helped me a lot to catch bugs ahead of time, and to ensure my content schema would work.

## Highlights

- Responsiveness: tested with default font-size of 32px and 500% of zoom;
- Accessibility: tested with keyboard navigation and screen reader;
- View Transition API;

- Menu structure: I used OOP to structure the menu behavior. The code became much easier to update and read, and reducing the ammount of parameter I had to pass to each function.
  Some of the functionalities in the menu:
- It opens and closes when the button is clicked;
- It triggers a focus trap to make keyboard navigation easier;
- It updates WAI-aria settings;
- It can be closed with escape on the keyboard or by clicking outside of the menu;
- On screen resize, all settings are updated

The code was like this:

menuEngine

```ts
import {
	toggleMenu,
	updateOnLoadAndResize,
	focusableNotLinks,
	closeMenu,
} from "./toggleMenu.ts";

function startMenu() {
	const buttonParent = document.querySelector(".burger-button");
	const button = buttonParent?.querySelector(".burger-button button");
	const menu = document.querySelector(".navigation-items");
	const links = menu?.querySelectorAll("a");
	const isFocusable = document.querySelectorAll("a, button");
	const isFocusableNotLinks = focusableNotLinks(isFocusable, links);

	updateOnLoadAndResize(buttonParent, menu, links, isFocusableNotLinks);

	window.addEventListener("resize", () =>
		updateOnLoadAndResize(buttonParent, menu, links, isFocusableNotLinks),
	);

	button?.addEventListener("click", () => {
		toggleMenu(menu, links, isFocusableNotLinks);
	});

	links?.forEach((link) =>
		link.addEventListener("click", () =>
			closeMenu(menu, links, isFocusableNotLinks),
		),
	);

	document.addEventListener("click", (e) => {
		const element = e.target as Element;
		//@ts-ignore
		if (!element.closest(menu.tagName) && e.target !== button) {
			closeMenu(menu, links, isFocusableNotLinks);
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === "Escape") {
			closeMenu(menu, links, isFocusableNotLinks);
		}
	});
}
export { startMenu };
```

toggleMenu

```ts
type NonSpecificElement = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;
type FocusableElements = NodeListOf<Element> | undefined;
type Tabindex = "0" | "-1";

const buttonParent = document.querySelector(".burger-button");

const button = buttonParent?.querySelector(".burger-button button");

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
	removeAriaExpanded();
}

function setTabindex(links: Links | Element[], number: Tabindex) {
	links?.forEach((link) => link.setAttribute("tabindex", number));
}

function removeClassOpen(menu: NonSpecificElement) {
	menu?.classList.remove("open");
}

function removeFocusTrap(focusableElements: Element[]) {
	setTabindex(focusableElements, "0");
}

function toggleMenu(
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	menu?.classList.toggle("open");

	const tabindex = defineTabindex(menu);

	setTabindex(links, tabindex);

	toggleFocusTrap(focusableElements, tabindex);

	updateAriaExpanded();
}

function defineTabindex(menu: NonSpecificElement) {
	return menu?.classList.contains("open") ? "0" : "-1";
}

function toggleFocusTrap(focusableElements: Element[], number: Tabindex) {
	const invertedNumber = number === "0" ? "-1" : "0";
	setTabindex(focusableElements, invertedNumber);
}

function closeMenu(
	menu: NonSpecificElement,
	links: Links,
	focusableElements: Element[],
) {
	if (buttonParent && getComputedStyle(buttonParent).display !== "none") {
		removeClassOpen(menu);
		setTabindex(links, "-1");
		removeFocusTrap(focusableElements);
		removeAriaExpanded();
	}
}

function updateAriaExpanded() {
	if (button) {
		const expandedAsBoolean = button.getAttribute("aria-expanded") === "true";
		const newValue = !expandedAsBoolean;
		button.setAttribute("aria-expanded", newValue.toString());
	}
}

function removeAriaExpanded() {
	if (button) {
		button.setAttribute("aria-expanded", "false");
	}
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
```

And it got to this:

menuEngine

```ts
import { Menu } from "./menuObject.ts";

function startMenu() {
	const buttonParent = document.querySelector(".burger-button");
	const menu = document.querySelector(".navigation-items");
	const links = menu?.querySelectorAll("a");

	const menuObject = new Menu(buttonParent, menu, links);

	menuObject.updateOnLoadAndResize();

	window.addEventListener("resize", () => menuObject.updateOnLoadAndResize());

	document.addEventListener("click", (e) => {
		if (
			//@ts-ignore
			!e.target.closest(menuObject.menu.tagName) &&
			e.target !== menuObject.buttonParent
		) {
			menuObject.closeMenu();
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === "Escape") {
			menuObject.closeMenu();
		}
	});
}

export { startMenu };
```

menuObject

```ts
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
			this.button.setAttribute("tabindex", "0");
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
```

## Challenges

- Client side scripts with view transitions
- SVG inside anchor tag
- Creating layout with vertical and horizontal line

## Lessons learned

- Making arrays into types
- Creating dynamic tags to support different heading levels in different pages. I created a function to make the process easier:

```ts
import type { HeadingLevel } from "../types/headingLevel.ts";

function generateChildHeading(parentHeading: HeadingLevel) {
	const parentLevelInteger = parseInt(parentHeading.slice(-1));
	//@ts-ignore
	const childHeading: HeadingLevel = `h${parentLevelInteger + 1}`;

	return childHeading;
}

export { generateChildHeading };
```

- I created a function to make slugs in url more uniform:

```ts
const notAlphaNumeric = /[^A-Za-z0-9]/g;

function normalizeString(str: string) {
	return str.replace(notAlphaNumeric, "").toLowerCase();
}

export { normalizeString };
```

## Chores

- [x] Start readme
- [x] Create gitignore
- [x] Configure Prettier and ESLint
- [x] Create staging environment and server
- [x] Install Sass
- [x] Reset CSS

- [x] Set project's typography
  - [x] Choose and import font-family
  - [x] Set sizes, weights and line-heights
- [x] Set project's colors
- [x] Set project's layout structure
  - [x] Set horizontal margins
  - [x] Set vertical margins and paddings

### Steps

- [x] Structure (spacing, sizes, colors), responsiveness

  - [x] Header
    - [x] HTML
    - [x] Mobile
    - [x] Desktop
  - [x] Footer
    - [x] HTML
    - [x] Mobile
    - [x] Desktop
  - [x] About me
    - [x] HTML
    - [x] Mobile
    - [x] Desktop
  - [x] Projects
    - [x] HTML
    - [x] Mobile
    - [x] Desktop
  - [x] Articles
    - [x] HTML
    - [x] Mobile
    - [x] Desktop

- [x] Animation

  - [x] Menu
  - [x] User interaction with buttons

- [x] Selection and scrollbar

- [x] Content schema

### Tests

- [x] Navigation with keyboard (tab, esc, enter)
- [x] Zoom 200%
- [x] Font-size 32px
- [x] Screens from 300px to 2500px
- [ ] Element's overflow
