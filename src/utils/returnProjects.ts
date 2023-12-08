import { getCollection } from "astro:content";

const projects = await getCollection("projects");
const projectsData = projects.reverse().map((project) => {
	return {
		slug: project.slug,
		title: project.data.title,
		summary: project.data.summary,
		purpose: project.data.purpose,
		technologyChoice: project.data.technologyChoice,
		highlights: project.data.highlights,
		challenges: project.data.challenges,
		lessonsLearned: project.data.lessonsLearned,
		image1: project.data.image1,
		altImage1: project.data.altImage1,
		image2: project.data.image2,
		altImage2: project.data.altImage2,
		technologies: project.data.technologies,
		githubUrl: project.data.githubUrl,
		projectUrl: project.data.projectUrl,
		isOnMain: project.data.isOnMain,
		date: project.data.date,
	};
});

export default projectsData;
