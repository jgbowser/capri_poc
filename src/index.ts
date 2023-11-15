import 'dotenv/config';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';

const llm = new OpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0,
});
