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
