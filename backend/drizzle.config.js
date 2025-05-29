/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./db/schema.js",
  out: "./db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./cars.db"
  }
};
