interface Article {
    title: string;
    abstract: string;
    doi?: string;
    url?: string;
    subjects?: string[];
    authors?: Author[];
    journal?: string;
    year?: number;
    volume?: number;
    issue?: number;
    pages?: string;
}

interface Author {
    affiliation: string;
    family: string;
    given: string;
    sequence: string;
    ORCID: string;
}

interface ArticleStore {
    article: Article;
    setArticle: (article: Article) => void;
}

export type { Article, ArticleStore };