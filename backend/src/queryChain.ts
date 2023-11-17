import 'dotenv/config';

import { RetrievalQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import { pgvectorStore } from './vectorStore.js';

import type { ChainValues } from 'langchain/schema';

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

export async function queryDocuments(question: string): Promise<ChainValues> {
  // Create a QA Chain with our template and LLM
  const chain = RetrievalQAChain.fromLLM(llm, pgvectorStore.asRetriever(), {
    prompt: PromptTemplate.fromTemplate(template),
  });
  // Put the chain into action by asking it a question
  const response = await chain.call({
    query: question,
  });

  // pgvectorStore.end();
  return response;
}
