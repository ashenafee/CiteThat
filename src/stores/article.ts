import { reactive } from "vue";
import { type Article } from "@/types/article";

export const articleStore = reactive({
    articles: [] as Article[],
    article: {} as Article,
    loading: false,
    error: false,
    errorMessage: '',
    setArticle(article: Article) {
        this.article = article;
    }
});