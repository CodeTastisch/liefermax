import { createSlice } from "@reduxjs/toolkit";

const warenkorbSlice = createSlice({
  name: "warenkorb",
  initialState: {
    products: [],
    priceSum: 0,
    wAmount: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
      state.wAmount += 1;
      state.priceSum += action.payload.price * action.payload.amount;
    },
    removeProduct: (state, action) => {
      const leftProducts = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      state.products = leftProducts;
      state.wAmount -= 1;
      state.priceSum -= action.payload.price * action.payload.amount;
    },
    clear: (state) => {
      state.products = [];
      state.wAmount = 0;
      state.priceSum = 0;
    },
  },
});

export const { addProducts, removeProduct, clear } = warenkorbSlice.actions;
export default warenkorbSlice.reducer;
