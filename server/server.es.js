const client = require("./server.client");
const params = require("./json/es.settings-mappings");
const _ = require("lodash");
const PRODUCTS = require("./json/products.json");

client.indices.create(
  {
    index: "catalog",
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

client.indices.delete(
  {
    index: "catalog",
  },
  (error, response, status) => {
    if (!error) {
      console.info("Deleted index");
      console.info(response);
    } else {
      console.info(error);
    }
  }
);

let initialBulk = { index: { _index: "catalog" } };
let collectionBulk = [];
_.map(_.keys(PRODUCTS), (uuid) => {
  collectionBulk = [...collectionBulk, initialBulk, PRODUCTS[uuid]];
});

client.bulk({ body: collectionBulk }, function (err, r) {
  if (err) {
    console.log(`Failed Bulk operation\n`, err);
  } else {
    console.log(`Successfully imported ${_.keys(PRODUCTS).length} items \n`);
  }
});
