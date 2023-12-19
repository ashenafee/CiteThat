import { MLACitation, APACitation, CSECitation, Citation } from "@/models/Citation";
import type { Article } from "@/types/article";

export const generateCitation = (article: Article, format: string): string => {
    switch (format) {
        case "MLA":
            return new MLACitation(article).toString();
        case "APA":
            return new APACitation(article).toString();
        case "CSE":
            return new CSECitation(article).toString();
        default:
            return new Citation(article).toString();
    }
}