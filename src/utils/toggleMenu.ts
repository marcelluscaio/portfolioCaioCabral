type Menu = Element | null;
type Links = NodeListOf<HTMLAnchorElement> | undefined;
type Tabindex = "0" | "-1";

function toggleMenu(menu: Menu, links: Links) {
	menu?.classList.toggle("open");

	const tabindex = defineTabindex(menu);

	setTabindex(links, tabindex);
}

function closeMenu(menu: Menu, links: Links) {
	menu?.classList.remove("open");
	setTabindex(links, "-1");
}

function updateTabindexBasedOnButtonDisplay(buttonParent: Menu, links: Links) {
	buttonParent && getComputedStyle(buttonParent).display === "none"
		? setTabindex(links, "0")
		: setTabindex(links, "-1");
}

function defineTabindex(menu: Menu) {
	return menu?.classList.contains("open") ? "0" : "-1";
}

function setTabindex(links: Links, number: Tabindex) {
	links?.forEach((link) => link.setAttribute("tabindex", number));
}

export { toggleMenu, setTabindex, updateTabindexBasedOnButtonDisplay };
