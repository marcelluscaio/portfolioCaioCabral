const techList = [
	"HTML",
	"CSS",
	"Sass",
	"Styled Components",
	"Tailwind",
	"JavaScript",
	"TypeScript",
	"Astro",
	"React",
	"Next.js",
	"WordPress",
	"PHP",
	"Node.js",
	"Express",
	"MongoDB",
] as const;

type Technologies = (typeof techList)[number];

export { techList };
export type { Technologies };
