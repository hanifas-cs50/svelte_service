module.exports = {
  schema: "./db/schema.js",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
};
