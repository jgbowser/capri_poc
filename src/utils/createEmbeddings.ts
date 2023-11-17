import 'dotenv/config';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { pgvectorStore } from '../vectorStore.js';

// Configure our text splitter for preprocessing our large documents
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1500,
  chunkOverlap: 200,
});
// Configure our PDF Document Loader
const loader = new PDFLoader('./oyster_bay_codes_full.pdf');
// Load the documents from the PDF, by default we get 1 document per page
const docs = await loader.load();
// split the docs up into smaller manageable chunks
const splitDocs = await splitter.splitDocuments(docs);
// Use the vectorStore to store the documents in the database as vectors
await pgvectorStore.addDocuments(splitDocs);

await pgvectorStore.end();
