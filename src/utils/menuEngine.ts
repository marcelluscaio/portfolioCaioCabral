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
