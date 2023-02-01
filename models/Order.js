import mongoose from "mongoose";

const OrderShema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
  },
  payment: {
    type: Number,
  },
  products: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        extras: {
          type: [
            {
              type: String,
            },
          ],
        },
      },
    ],
    required: true,
  },
});

//delete mongoose.connection.models["Order"];
export default mongoose.models.Order || mongoose.model("Order", OrderShema);
