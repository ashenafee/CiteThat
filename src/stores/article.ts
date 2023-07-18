import { reactive } from "vue";
import { type Article } from "@/types/article";

export const articleStore = reactive({
    articles: [] as Article[],
    article: {} as Article,
    loading: false,
    error: false,
    errorMessage: '',
    parseToArticle(rawArticle: any) {

        const parser = new DOMParser();

        console.log(rawArticle);

        const article: Article = {
            title: rawArticle.title[0],
            abstract: parser.parseFromString(rawArticle.abstract, 'text/html').body.innerText,
            doi: rawArticle.DOI,
            url: rawArticle.URL,
            subjects: rawArticle.subject,
            authors: rawArticle.author,
            journal: rawArticle['container-title'][0],
            year: rawArticle.issued['date-parts'][0][0],
            volume: rawArticle.volume,
            issue: rawArticle.issue,
            pages: rawArticle.page
        }
        this.article = article;
    }
});