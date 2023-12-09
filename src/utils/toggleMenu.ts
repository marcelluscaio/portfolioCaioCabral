type Menu = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;
type Tabindex = "0" | "-1";

function toggleMenu(menu: Menu, links: Links) {
	menu?.classList.toggle("open");

	const tabindex = defineTabindex(menu);

	setTabindex(links, tabindex);
}

function defineTabindex(menu: Menu) {
	return menu?.classList.contains("open") ? "0" : "-1";
}

function setTabindex(links: Links, number: Tabindex) {
	links?.forEach((link) => link.setAttribute("tabindex", number));
}

function updateOnLoadAndResize(buttonParent: Menu, menu: Menu, links: Links) {
	buttonParent && getComputedStyle(buttonParent).display === "none"
		? setDesktopView(menu, links)
		: setTabindex(links, "-1");
}

function setDesktopView(menu: Menu, links: Links) {
	removeClassOpen(menu);
	setTabindex(links, "0");
}

function removeClassOpen(menu: Menu) {
	menu?.classList.remove("open");
}

export { toggleMenu, setTabindex, updateOnLoadAndResize };
