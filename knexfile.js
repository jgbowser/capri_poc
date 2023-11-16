const config = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'capri-poc',
      user: 'postgres',
      password: 'docker',
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
};

export default config;
