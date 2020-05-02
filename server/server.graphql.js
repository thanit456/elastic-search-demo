const { ElasticSearchClient } = require("./server.elasticsearch");
const elasticSearchSchema = require("./server.es.schema");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = `
    type Product {
        name: String,
        brand: String!,
        amount: String,
        price_baht: String
    }

    type Query {
        products: [Product]
    }
`;

const resolvers = {
  Query: {
    products: () =>
      new Promise((resolver, reject) => {
        ElasticSearchClient({ ...elasticSearchSchema }).then((r) => {
          let _source = r["hits"]["hits"];
          _source.map((item, i) => (_source[i] = item._source));

          resolver(_source);
        });
      }),
  },
};
