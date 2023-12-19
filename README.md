# CiteThat

![Banner](/public/banner.png)
![GitHub](https://img.shields.io/github/license/ashenafee/CiteThat?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/ashenafee/CiteThat?style=for-the-badge)

## About

[CiteThat](https://citethat.netlify.app/) is a simple tool to help you cite your sources. It is built using **Vue**. With CiteThat, you can look up information on *almost* any paper available through PubMed.

https://github.com/ashenafee/CiteThat/assets/20289287/11b94878-d175-46aa-94f9-4376da7137ba

## Background

I created CiteThat after having a job interview where the interviewer brought up **Vue**, but I had no experience in Vue. This tool is the result of me learning Vue.

## Installation

In your terminal, run the following commands to have a working local environment from which you can run the project.
```bash
git clone https://github.com/ashenafee/CiteThat.git
cd CiteThat
npm install
```

## Usage

### Remote

You can use the freely hosted version of CiteThat available [here](https://citethat.netlify.app/). Note that this means it is more subject to rate limits and slow downs.

### Local

1. Run the following command to start the server:

    ```bash
    cd CiteThat
    npm run dev
    ```

2. Open your browser and navigate to `localhost:4000`

3. Enter the PubMed link of the paper you want to cite and click the `Cite` button.

## Roadmap

- [ ] Add multiple citation formats
- [x] Parse information necessary for citations
- [x] Allow the user to input their own sources for downloading
