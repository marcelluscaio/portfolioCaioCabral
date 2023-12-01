import { defineCollection, z } from "astro:content";
import { techList } from "../types/technologies";

const projectsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description1: z.string(),
			description2: z.string(),
			image1: image(),
			altImage1: z.string(),
			image2: image(),
			altImage2: z.string(),
			technologies: z.array(z.enum(techList)),
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
