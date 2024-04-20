import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    charities: [],
    payments: [],
    selectAmount: 0,
  },
  reducers: {
    setSelectAmount: (state, action) => {
      state.selectAmount = action.payload;
    },
    setCharities: (state, action) => {
      state.charities = action.payload;
    },
    setPaymentTransactions: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setSelectAmount, setCharities, setPaymentTransactions } =
  appSlice.actions;
export default appSlice.reducer;
