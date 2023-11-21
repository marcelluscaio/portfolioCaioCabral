import { getCollection } from "astro:content";

const projects = await getCollection("projects");
const projectsData = projects.map((project) => {
	return {
		slug: project.slug,
		title: project.data.title,
		description1: project.data.description1,
		decription2: project.data.description2,
		image1: project.data.image1,
		image2: project.data.image2,
		technologies: project.data.technologies,
		githubUrl: project.data.githubUrl,
		projectUrl: project.data.projectUrl,
		isOnMain: project.data.isOnMain,
	};
});

export default projectsData;
