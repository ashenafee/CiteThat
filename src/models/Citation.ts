import { type Article } from "@/types/article";

class Citation {
    constructor(public article: Article) {}

    toString(): string {
        return `Citation: ${this.article.title} by ${this.getAuthorNames()}, published on ${this.article.year}`;
    }

    protected getAuthorNames(n: number = (this.article.authors?.length ?? 0) as number): string {
        if (this.article.authors && this.article.authors.length > 0) {
            const authors = this.article.authors.slice(0, n).map(author => `${author.given} ${author.family}`);
            if (this.article.authors.length > n) {
                authors.push("et al.");
            }
            return authors.join(", ");
        }
        return "Unknown Author";
    }
}

class MLACitation extends Citation {
    constructor(public article: Article) {
        super(article);
    }

    toString(): string {
        return `${super.toString()}, MLA format`;
    }
}

class APACitation extends Citation {
    constructor(public article: Article) {
        super(article);
    }

    toString(): string {
        return `${super.toString()}, APA format`;
    }
}

class CSECitation extends Citation {
    constructor(public article: Article) {
        super(article);
    }

    /**
     * Retrieves the names of the authors for the citation.
     * 
     * @param n The number of author names to retrieve. Defaults to the length
     * of the authors array.
     * @returns A string containing the author names separated by commas.
     */
    protected getAuthorNames(n: number = (this.article.authors?.length ?? 0) as number): string {
        if (this.article.authors && this.article.authors.length > 0) {
            const authors = this.article.authors.slice(0, n).map(author => `${author.family} ${author.given.charAt(0)}`);
            if (this.article.authors.length > n) {
                authors.push("et al.");
            }
            return authors.join(", ");
        }
        return "Unknown Author";
    }

    /**
     * Returns a string representation of the CSE Citation object.
     * The string includes the author names, article details, and DOI.
     * @returns A string representation of the CSE Citation object.
     */
    toString(): string {
        const authors = this.getAuthorNames(5);
        const year = this.article.year;
        const title = this.article.title;
        const journal = this.article.journal;
        const volume = this.article.volume;
        const issue = this.article.issue;
        const pages = this.article.pages;
        const doi = this.article.doi;

        return `${authors} ${title} ${journal}. ${year};${volume}(${issue}):${pages}. doi:${doi}`;
    }
}

// Export
export {
    Citation,
    MLACitation,
    APACitation,
    CSECitation
}
