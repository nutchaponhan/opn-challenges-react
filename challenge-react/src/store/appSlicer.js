import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    charities: [],
    payments: [],
    selectAmount: 0,
  },
  reducers: {
    select: (state, action) => {
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

export const { select, setCharities, setPaymentTransactions } =
  appSlice.actions;
export default appSlice.reducer;
