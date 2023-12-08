function openMenu(
	menu: Element | null,
	links: NodeListOf<HTMLAnchorElement> | undefined,
) {
	menu?.classList.toggle("open");

	const tabindex = defineTabindex(menu);

	setTabindex(links, tabindex);
}

function defineTabindex(menu: Element | null) {
	return menu?.classList.contains("open") ? "0" : "-1";
}

function setTabindex(
	links: NodeListOf<HTMLAnchorElement> | undefined,
	number: "0" | "-1",
) {
	links?.forEach((link) => link.setAttribute("tabindex", number));
}

export { openMenu, setTabindex };
