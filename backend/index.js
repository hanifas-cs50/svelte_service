const Fastify = require("fastify");
const cors = require("@fastify/cors");
const carsRoutes = require("./carsRoutes");

const app = Fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
});

app.get("/health", () => ({ status: "cars-backend up" }));

app.register(carsRoutes, { prefix: "/cars" });

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
