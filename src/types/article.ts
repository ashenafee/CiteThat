interface Article {
    title: string;
    abstract: string;
    doi?: string;
    url?: string;
    subjects?: string[];
}

interface ArticleStore {
    article: Article;
    setArticle: (article: Article) => void;
}

export type { Article, ArticleStore };