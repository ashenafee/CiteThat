<script setup lang="ts">

  import { articleStore } from '@/stores/article';

  const onClickCite = () => {

    const resultsElement = document.getElementById('pubmed-results') as HTMLDivElement;

    // Grab the progress bar and begin it
    const progressBar = document.getElementById('pubmed-progress') as HTMLProgressElement;
    progressBar.classList.replace('invisible', 'visible');

    // Grab the text from the PubMed URL input field
    const inputTextElement = document.getElementById("pubmed-search") as HTMLInputElement;
    const inputText = inputTextElement.value;
    
    // Parse the ID from the PubMed URL
    // e.g., 37176923 in https://pubmed.ncbi.nlm.nih.gov/37176923/
    const pmid = parsePmid(inputText);

    // Call the Entrez API
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}`;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const content = new window.DOMParser().parseFromString(data, "text/xml");

        // Parse the response
        const doi = content.querySelector("PubmedArticleSet > PubmedArticle > PubmedData > ArticleIdList > ArticleId[IdType='doi']")?.textContent;
        
        // Query using Crossref for information on the article
        if (doi) {
          fetch(`https://api.crossref.org/works/${doi}`)
            .then((response) => response.json())
            .then((data) => {
              progressBar.classList.replace('visible', 'invisible');
              console.log(data);

              articleStore.parseToArticle(data.message);
              console.log(articleStore.article);
            });

        } else {
          return ;
        }
      })
      .then((data) => {
        console.log(data);
        resultsElement.classList.replace('invisible', 'visible');
        resultsElement.classList.add('flex', 'flex-col', 'w-full');
      })

    console.log(pmid);
  };

  const parsePmid = (url: string) => {

    const splitUrl = url.split('/');

    const elements: string[] = [];

    splitUrl.forEach((x) => {
      if (x) {
        elements.push(x);
      }
    });

    return elements.pop();
  };

  const onClickDownload = () => {
    // Get the DOI
    const doi = articleStore.article.doi;

    // Open the URL in a new tab
    window.open(`https://sci.bban.top/pdf/${doi}.pdf?download=true`, '_blank');
  };

  const onClickView = () => {
    // Get the DOI
    const doi = articleStore.article.doi;

    // Open the URL in a new tab
    window.open(`https://doi.org/${doi}`, '_blank');
  }

  

</script>

<template>
  <div class="flex flex-col w-full h-screen justify-center items-center overflow-y-auto">
    <div class="flex flex-col w-1/2">
      <h1 class="text-4xl font-bold mb-2">CiteThat</h1>

      <div class="flex flex-row w-full justify-center items-center">
        <InputText id="pubmed-search" placeholder="PubMed Article" class="border-0 rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none w-full" />
        <Button class="border-0 rounded-tr-xl rounded-br-xl rounded-tl-none rounded-bl-none focus:shadow-none" v-on:click="onClickCite">Cite</Button>
      </div>
      <ProgressBar id="pubmed-progress" mode="indeterminate" class="h-2 mt-2 rounded-xl invisible"></ProgressBar>
      <div id="pubmed-results" class="invisible">
        <Accordion>
          <!-- Fetch the article title from the store -->
          <AccordionTab :header="articleStore.article.title">
            <h4 class="text-lg font-bold mb-2">Abstract</h4>
            <p class="mb-2 overflow-y-auto h-48">{{ articleStore.article.abstract }}</p>
          </AccordionTab>
        </Accordion>

        <div class="mt-2 flex flex-row w-full">
          <Button severity="info" class="mr-2 border-0 rounded-xl focus:shadow-none w-1/2 justify-center">Cite</Button>
          <Button severity="info" class="mr-2 border-0 rounded-xl focus:shadow-none w-1/2 text-center justify-center" v-on:click="onClickDownload">Download</Button>
          <Button severity="info" class="focus:shadow-none border-0 rounded-xl w-1/2 text-center justify-center" v-on:click="onClickView">View</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

  :deep(.p-inputtext:focus) {
    box-shadow: none;
  }

  :deep(.p-accordion-header:focus) {
    box-shadow: none;
    outline: none;
  }

  :deep(#pubmed-results > div.mt-2.flex.flex-row.w-full > .p-button:focus) {
    box-shadow: none;
    outline: none;
  }

  /* Apply box-shadow none to all "a" elements that are children of p-accordion-header elements when focused */
  :deep(#pubmed-results > div > div > div.p-accordion-header > a:focus) {
    box-shadow: none;
  }
</style>