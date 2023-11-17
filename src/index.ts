import 'dotenv/config';

import { RetrievalQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import { pgvectorStore } from './vectorStore.js';

// Configure our chosen LLM. In this case, we're using GPT-3.5 Turbo with no temperature.
const llm = new OpenAI({
  modelName: 'gpt-4-1106-preview',
  temperature: 0,
});
// Create a prompt template to be fed into our QA Chain
const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
If you know which section of the document the content that led to the answer is found in please
provide that information for the purposes of further research.
{context}
Question: {question}
Helpful Answer:`;

// Create a QA Chain with our template and LLM
const chain = RetrievalQAChain.fromLLM(llm, pgvectorStore.asRetriever(), {
  prompt: PromptTemplate.fromTemplate(template),
});

const response = await chain.call({
  query: 'Can I open a weed shop in Oyster Bay?',
});

pgvectorStore.end();

console.log(response);
