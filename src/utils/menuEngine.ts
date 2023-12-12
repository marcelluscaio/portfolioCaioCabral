import {
	/* toggleMenu,
	updateOnLoadAndResize,
	focusableNotLinks,
	closeMenu, */
	Menu,
} from "./toggleMenu.ts";

function startMenu() {
	const buttonParent = document.querySelector(".burger-button");
	const menu = document.querySelector(".navigation-items");
	const links = menu?.querySelectorAll("a");

	const menuClass = new Menu(buttonParent, menu, links);

	menuClass.updateOnLoadAndResize();
	window.addEventListener("resize", () => menuClass.updateOnLoadAndResize());

	buttonParent?.addEventListener("click", () => {
		menuClass.toggleMenu();
	});

	document.addEventListener("click", (e) => {
		//@ts-ignore
		if (!e.target.closest(menu.tagName) && e.target !== buttonParent) {
			menuClass.closeMenu();
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.key === "Escape") {
			menuClass.closeMenu();
		}
	});
}

export { startMenu };
