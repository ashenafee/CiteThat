import type { Author, Article } from "@/types/article";

/**
 * Parses an XML element representing an article and returns an Article object.
 * @param articleXml - The XML element representing the article.
 * @returns The parsed Article object.
 */
export function parseToArticle(articleXml: Element): Article {
    const title: string = articleXml.querySelector('ArticleTitle')?.textContent || '';
    const abstract: string = articleXml.querySelector('AbstractText')?.textContent || '';
    const doi: string = articleXml.querySelector('PubmedData ArticleIdList ArticleId[IdType="doi"]')?.textContent || '';
    const url: string = `https://doi.org/${doi}`;

    const subjects: string[] = Array.from(articleXml.querySelectorAll('MedlineCitation MeshHeadingList MeshHeading DescriptorName'), subjectElement => subjectElement.textContent || '');

    const authors: Author[] = Array.from(articleXml.querySelectorAll('MedlineCitation Article AuthorList Author'), authorElement => {
        const lastName: string = authorElement.querySelector('LastName')?.textContent || '';
        const foreName: string = authorElement.querySelector('ForeName')?.textContent || '';
        const initials: string = authorElement.querySelector('Initials')?.textContent || '';
        const affiliation: string = authorElement.querySelector('AffiliationInfo Affiliation')?.textContent || '';
        return {
            family: lastName,
            given: foreName,
            affiliation: affiliation,
            initials: initials
        };
    });

    const journal: string = articleXml.querySelector('MedlineCitation Article Journal Title')?.textContent || '';

    const year: number = parseInt(articleXml.querySelector('MedlineCitation Article Journal JournalIssue PubDate Year')?.textContent || '');

    const volume: number = parseInt(articleXml.querySelector('MedlineCitation Article Journal JournalIssue Volume')?.textContent || '');

    const issue: number = parseInt(articleXml.querySelector('MedlineCitation Article Journal JournalIssue Issue')?.textContent || '');

    const pages: string = articleXml.querySelector('MedlineCitation Article Pagination MedlinePgn')?.textContent || '';

    return {
        title,
        abstract,
        doi,
        url,
        subjects,
        authors,
        journal,
        year,
        volume,
        issue,
        pages
    };
}