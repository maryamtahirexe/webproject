import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api.js";

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    const response = await API.get("/payments");
    return response.data;
  }
);

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (paymentData) => {
    const response = await API.post("/payments", paymentData);
    return response.data;
  }
);

export const updatePayment = createAsyncThunk(
  "payments/updatePayment",
  async ({ id, ...paymentData }) => {
    const response = await API.put(`/payments/${id}`, paymentData);
    return response.data;
  }
);

export const deletePayment = createAsyncThunk(
  "payments/deletePayment",
  async (id) => {
    await API.delete(`/payments/${id}`);
    return id;
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.payments.findIndex(
          (payment) => payment._id === action.payload._id
        );
        if (index !== -1) state.payments[index] = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload
        );
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
