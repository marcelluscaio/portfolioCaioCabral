import type { ProjectFilters } from "../types/projectFilters";
import type { Projects } from "../types/projects";
import type { Technologies } from "../types/technologies";

function filterProjects(projects: Projects, filterString: ProjectFilters) {
	if (filterString === "isOnMain") {
		return filterHighlights(projects);
	} else {
		return filterByTechnology(projects, filterString as Technologies);
	}
}

function filterHighlights(projects: Projects) {
	return projects.filter((project) => project.isOnMain);
}

function filterByTechnology(projects: Projects, technology: Technologies) {
	return projects.filter((project) => project.technologies.includes(technology));
}

export { filterProjects };
