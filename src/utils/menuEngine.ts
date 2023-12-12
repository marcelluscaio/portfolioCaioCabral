import { Menu } from "./toggleMenu.ts";

function startMenu() {
	const buttonParent = document.querySelector(".burger-button");
	const menu = document.querySelector(".navigation-items");
	const links = menu?.querySelectorAll("a");

	const menuClass = new Menu(buttonParent, menu, links);

	menuClass.updateOnLoadAndResize();

	window.addEventListener("resize", () => menuClass.updateOnLoadAndResize());

	document.addEventListener("click", (e) => {
		if (
			//@ts-ignore
			!e.target.closest(menuClass.menu.tagName) &&
			e.target !== menuClass.buttonParent
		) {
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
