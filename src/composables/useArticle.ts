import type { Article } from "@/types/article";
import { parseToArticle } from "@/utils/parser";

/**
 * Parses the PMID (PubMed ID) from a given URL.
 * 
 * @param url - The URL containing the PMID.
 * @returns The extracted PMID.
 */
export const parsePmid = (url: string) => {
    // Extract PMID from URL
    const urlParts: string[] = url.split("/");
    const pmid: string = urlParts[urlParts.length - 2];

    return pmid;
};


/**
 * Fetches the article data from the PubMed API.
 * 
 * @param pmid - The PMID of the article to fetch.
 * @returns The article data.
 */
export async function fetchArticle(pmid: string): Promise<Article> {
    // Fetch article data from PubMed API
    const response = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml`
    );

    // Extract the response XML
    const data: string = await response.text();

    // Parse the response XML
    const parser: DOMParser = new DOMParser();
    const xml: Document = parser.parseFromString(data, "text/xml");
    const pubmedArticle: Element = xml.getElementsByTagName("PubmedArticle")[0];

    const article: Article = parseToArticle(pubmedArticle);

    return article;
};


/**
 * Fetches the citation data from the PubMed API.
 * 
 * @param article - The article to fetch the citation for.
 * @returns The citation data.
 */
export const fetchCitation = async (article) => {
    // Logic to fetch citation
};
