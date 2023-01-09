// Update with your config settings.
import { knexSnakeCaseMappers } from "objection";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connection = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {
  //Using postgresql as default client for all running phases.
  development: {
    client: "postgresql",
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    ...knexSnakeCaseMappers,
  },
};

export default config;
