import 'dotenv/config';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PGVectorStore } from 'langchain/vectorstores/pgvector';

import type { PoolConfig } from 'pg';

const config = {
  postgresConnectionOptions: {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'capri-poc',
  } as PoolConfig,
  tableName: 'documents',
  columns: {
    idColumnName: 'id',
    vectorColumnName: 'embedding',
    contentColumnName: 'content',
    metadataColumnName: 'metadata',
  },
};

export const pgvectorStore = await PGVectorStore.initialize(
  new OpenAIEmbeddings(),
  config,
);
