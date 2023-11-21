import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description1: z.string(),
		description2: z.string(),
		image1: z.string(),
		image2: z.string(),
		technologies: z.array(z.string()),
		githubUrl: z.string(),
		projectUrl: z.string(),
		isOnMain: z.boolean().optional(),
	}),
});

const articlesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		articleUrl: z.string(),
		isOnMain: z.boolean().optional(),
	}),
});
export const collections = {
	projects: projectsCollection,
	articles: articlesCollection,
};
