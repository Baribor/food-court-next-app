import knex from "knex";
import knexfile from "./knexfile";
import { Model } from "objection";

let cached = global.pg;
if (!cached) cached = global.pg = {};

export function dbConn() {
  if (!cached.instance) {
    const db = knex(knexfile.development);
    Model.knex(db);
    cached.instance = db;
  }
  return cached.instance;
}
