const client = require("./server.client");
const params = require("./json/es.settings-mappings");

client.indices.create(
  {
    index: "clothes",
    body: params,
  },
  (error, response, status) => {
    if (!error) {
      console.info("\n Created a new index");
      console.info(response);
      console.info("\n");
    }
  }
);
