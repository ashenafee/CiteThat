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
        }
        this.article = article;
    }
});