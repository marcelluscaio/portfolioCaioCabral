import { defineCollection, z } from "astro:content";
import { techList } from "../types/technologies";
import { stringToDate } from "../utils/stringToDate";

const projectsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			purpose: z.string(),
			technologyChoice: z.string(),
			highlights: z.string(),
			challenges: z.string(),
			lessonsLearned: z.string(),
			image1: image(),
			altImage1: z.string(),
			image2: image(),
			altImage2: z.string(),
			technologies: z.array(z.enum(techList)),
			githubUrl: z.string(),
			projectUrl: z.string(),
			isOnMain: z.boolean().optional(),
			date: z.string().transform((str) => stringToDate(str)),
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
