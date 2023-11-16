/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS vector;`);
  await knex.raw(`
    DROP TABLE IF EXISTS "documents";
    CREATE TABLE IF NOT EXISTS "documents" (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      embedding vector(1536) NOT NULL,
      metadata JSONB NOT NULL
    );
  `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.raw(`DELETE FROM documents;`);
  await knex.raw(`DROP TABLE IF EXISTS documents;`);
}
