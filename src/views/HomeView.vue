<template>
    <div class="flex flex-col w-full h-screen justify-center items-center overflow-y-auto">
        <div class="flex flex-col w-1/2">
            <h1 class="text-4xl font-bold mb-2">CiteThat</h1>

            <!-- Search -->
            <div class="flex flex-row w-full justify-center items-center">
                <input v-model="inputText" type="text" placeholder="PubMed Article" class="input input-bordered w-full rounded-r-none focus:outline-none" />
                <button class="btn bg-blue-700 hover:bg-blue-800 rounded-l-none" @click="onClickCite">
                    Search
                </button>
            </div>

            <!-- Citation Modal -->
            <dialog id="citationModal" class="modal" visible="visibleCitation">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">
                        Citation
                    </h3>
                    <p class="py-4">{{ citation }}</p>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <!-- Source Modal -->
            <dialog id="sourceModal" class="modal" visible="visibleSource">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">
                        Source
                    </h3>
                    
                    <div class="flex flex-row w-full justify-center items-center">
                        <input v-model="articleSourceUrl" type="text" placeholder="Source" class="input input-bordered w-full rounded-r-none focus:outline-none" />
                        <button class="btn bg-blue-700 hover:bg-blue-800 rounded-l-none" @click="onClickSetSource">
                            Set
                        </button>
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <progress v-if="progressBarVisible" class="progress w-full h-2 mt-2"></progress>
            <!-- Results Portion -->
            <div v-if="resultsVisible" class="mt-2">
                <!-- Result -->
                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" id="result" class="collapse-toggle" />
                    <label for="result" class="collapse-title text-xl font-medium cursor-pointer">
                        {{ articleStore.article.title }}
                    </label>
                    <div class="collapse-content">
                        <p class="mb-2 overflow-y-auto h-48">
                            {{ articleStore.article.abstract }}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="mt-2 flex flex-row w-full space-x-2">
                    <button class="btn flex-1 bg-blue-700 hover:bg-blue-800" @click="onClickGetCitation">
                        Cite
                    </button>
                    <button class="btn flex-1 bg-blue-700 hover:bg-blue-800" @click="onClickDownload">
                        Download
                    </button>
                    <button class="btn flex-1 bg-blue-700 hover:bg-blue-800" @click="onClickView">
                        View
                    </button>
                </div>
            </div>
            <button class="btn bg-blue-700 hover:bg-blue-800 mt-2" @click="onClickOpenSourceModal">
                Source
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { articleStore } from "@/stores/article";
import { fetchArticle, parsePmid } from "@/composables/useArticle";
import { generateCitation } from "@/utils/cite";

const inputText = ref('');
const progressBarVisible = ref(false);
const resultsVisible = ref(false);
const citation = ref('');
const visibleCitation = ref(false);
const visibleSourceDialog = ref(false);
const articleSourceUrl = ref('');

/**
 * Handles the click event for the "Cite" button. If the input text is empty,
 * displays an alert message. Otherwise, fetches the article data using the
 * PubMed URL, sets the fetched article in the article store, and displays the
 * results. If an error occurs during fetching, displays an error message.
 * Finally, hides the progress bar.
 */
const onClickCite = async () => {
    if (!inputText.value) {
        alert('Please enter a PubMed URL.');
        return;
    }
    progressBarVisible.value = true;
    try {
        const pmid = parsePmid(inputText.value);
        const article = await fetchArticle(pmid);
        articleStore.setArticle(article);
        resultsVisible.value = true;
    } catch (error) {
        console.error(error);
        alert('Error fetching article data.');
    } finally {
        progressBarVisible.value = false;
    }
};

const onClickGetCitation = async () => {
    try {
        const fetchedCitation = generateCitation(articleStore.article, 'CSE');
        if (fetchedCitation !== void 0) {
            citation.value = fetchedCitation;
        } else {
            citation.value = '';
        }
        visibleCitation.value = true;

        // Show modal
        const modal = document.getElementById('citationModal') as HTMLDialogElement;
        modal.showModal();
    } catch (error) {
        console.error(error);
        alert('Error generating citation.');
    }
};

const onClickOpenSourceModal = () => {
    // Show modal
    const modal = document.getElementById('sourceModal') as HTMLDialogElement;
    modal.showModal();
}

const onClickSetSource = () => {
    localStorage.setItem('article-source', articleSourceUrl.value);
    visibleSourceDialog.value = false;

    // Hide modal
    const modal = document.getElementById('sourceModal') as HTMLDialogElement;
    modal.close();
};

const onClickDownload = () => {
    const source = localStorage.getItem('article-source');
    if (!source) {
        alert('Please set article source URL.');
        return;
    }
    const url = `${source}${articleStore.article.doi}`;
    window.open(url, '_blank');
    console.log("🚀 ~ file: HomeView.vue:119 ~ onClickDownload ~ url:", url)
};

const onClickView = () => {
    const source = localStorage.getItem('article-source');
    if (!source) {
        alert('Please set article source URL.');
        return;
    }
    const url = `https://doi.org/${articleStore.article.doi}`;
    window.open(url, '_blank');
};
</script>

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

:deep(#pubmed-results > div > div > div.p-accordion-header > a:focus) {
    box-shadow: none;
}
</style>
