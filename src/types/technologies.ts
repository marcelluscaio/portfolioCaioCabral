const techList = ["HTML", "CSS", "JavaScript", "Astro", "WordPress"] as const;

type Technologies = (typeof techList)[number];

export { techList };
export type { Technologies };
