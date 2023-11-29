const techList = ["HTML", "CSS", "JavaScript", "Astro", "WordPress"] as const;

type Technologies = (typeof techList)[number];

/* "HTML" | "CSS" | "JavaScript"; */
export { techList };
export type { Technologies };
