import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handlerSingle(req, res) {
  console.log("kommt in handler1");

  const {
    method,
    query: { nr },
  } = req;

  await mongodb.dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(nr);
      res.status(200).json(order);
    } catch (error) {
      res.status(200).json(error);
    }
  }
  if (method === "PUT") {
    try {
      console.log(req.body);
      const order = await Order.findByIdAndUpdate(nr, req.body, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(nr);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
