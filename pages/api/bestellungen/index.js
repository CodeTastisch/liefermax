import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handlerAll(req, res) {
  console.log("kommt in handler");

  const { method } = req;

  await mongodb.dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(201).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
