import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productName: '',
  },
  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
  },
});

export const { setProductName } = productSlice.actions;
export default productSlice.reducer;
