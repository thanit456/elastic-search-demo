const client = require("./server.client");
const elasticSearchSchema = require("./server.es.schema");

client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    error
      ? console.error("ElasticSearch cluster is down!")
      : console.log("ElasticSearch is ok");
  }
);

function ApiElasticSearchClient(req, res) {
  ElasticSearchClient({ ...elasticSearchSchema })
    .then((r) => res.send(r["hits"]["hits"]))
    .catch((e) => {
      console.error(e);
      res.send([]);
    });
}

function ElasticSearchClient(body) {
  return client.search({ index: "clothes", body: body });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient,
};
