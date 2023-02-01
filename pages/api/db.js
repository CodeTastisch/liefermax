// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "../../utils/mongodb";
import jsondb from "../../jsondb/products";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await mongodb.dbConnect();

  await Product.deleteMany();

  console.log("alle gelöscht");

  await Product.insertMany(jsondb.products);

  console.log("alle eingefügt");

  await mongodb.dbDisconnect();
  res.send({ text: " Daten gespeichert" });
}
