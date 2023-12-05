const techList = [
	"HTML",
	"CSS",
	"JavaScript",
	"Astro",
	"WordPress",
	"TypeScript",
] as const;

type Technologies = (typeof techList)[number];

export { techList };
export type { Technologies };
