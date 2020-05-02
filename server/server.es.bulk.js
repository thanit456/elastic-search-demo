const client = require("./server.client");
const _ = require("lodash");
const PRODUCTS = require("./json/products.json").products;

let initialBulk = { index: { _index: "clothes" } };
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
