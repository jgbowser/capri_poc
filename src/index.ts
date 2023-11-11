import * as fs from "fs";
import "dotenv/config";
import { compile } from "html-to-text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

const url = "https://ecode360.com/26884347";
console.time("execution time");
console.log("Creating extractor");

const compiledConvert = compile({
  wordwrap: 130,
  baseElements: { selectors: ["#main"] },
  selectors: [
    { selector: "a", options: { ignoreHref: true } },
    { selector: "a.xref", format: "skip" },
    { selector: "img", format: "skip" },
  ],
});

console.log("Creating loader");

const loader = new RecursiveUrlLoader(url, {
  extractor: compiledConvert,
  maxDepth: 1,
  excludeDirs: ["https://ecode360.com/26884347/attachment/"],
});

console.log("Loading documents....");

const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2500,
  chunkOverlap: 250,
});

const docOutput = await splitter.splitDocuments(docs);
const embeddings = new OpenAIEmbeddings();

console.log("Loading documents into vector store");
const vectorStore = await MemoryVectorStore.fromDocuments(
  docOutput,
  embeddings
);

console.log("Vector store loaded");

console.log("beginning query process...");
const question =
  "If I need to get a special permit, how would I do so? What is the process?";

const docVectors = await vectorStore.similaritySearch(question);
const context = docVectors
  .map((doc) => doc.pageContent.replace(/\n+/, "\n").trim())
  .join("\n ------ \n");
const prompt = `You are a helpful assistant that loves to help people. Using only the context provided answer the question. If you cannot answer the question using only the provided context respond with "I'm sorry, I cannot answer that"
Context:
${context}

Question: """
${question}
"""

If possible, please provide citations to related section number of the answer was found in.
`;
const res = await llm.call(prompt);
console.log(res);
console.timeEnd("execution time");
