const techList = [
	"HTML",
	"CSS",
	"Sass",
	"JavaScript",
	"TypeScript",
	"Astro",
	"React",
	"Next.js",
	"WordPress",
	"PHP",
] as const;

type Technologies = (typeof techList)[number];

export { techList };
export type { Technologies };
