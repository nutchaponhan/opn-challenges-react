import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API } from '../helper/api';

export const fetchCharities = createAsyncThunk('charities/getAll', async () => {
  const response = await API.GET('/charities');
  return response.data;
});

export const fetchPayments = createAsyncThunk('payments/getAll', async () => {
  const response = await API.GET('/payments');
  return response.data;
});

export const postPayment = createAsyncThunk(
  'payments/post',
  async (params, { rejectWithValue }) => {
    const { data, cb } = params;

    cb?.onPending();

    try {
      const response = await API.POST('/payments', data);
      const responseData = response.data;

      cb?.onSuccess();

      return responseData;
    } catch (err) {
      cb?.onError(data);
      return rejectWithValue(data);
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    charities: [],
    payments: [],
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
  extraReducers: (builder) => {
    builder.addCase(fetchCharities.fulfilled, (state, action) => {
      state.charities = action.payload;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(postPayment.fulfilled, (state, action) => {
      const newPaymentTransaction = action.payload;
      state.payments.push(newPaymentTransaction);
    });
  },
});

export const { setSelectAmount, setCharities, setPaymentTransactions } =
  appSlice.actions;
export default appSlice.reducer;
