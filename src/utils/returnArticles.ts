import { getCollection } from "astro:content";

const articles = await getCollection("articles");
const articlesData = articles.map((article) => {
	return {
		slug: article.slug,
		title: article.data.title,
		description: article.data.description,
		url: article.data.articleUrl,
		isOnMain: article.data.isOnMain,
	};
});

export default articlesData;
