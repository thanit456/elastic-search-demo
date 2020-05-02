const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ApiElasticSearchClient } = require("./server.elasticsearch");
const madeExecutableSchema = require("./server.graphql");

const PORT = 9100;

const server = new ApolloServer({
  schema: madeExecutableSchema,
  playground: true,
});

app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method"
  );
  next();
});

app.get("/search", ApiElasticSearchClient);

server.applyMiddleware({ app });

app.listen(PORT, function () {
  console.log(`Express server listening on port :${PORT}${server.graphqlPath}`);
});
