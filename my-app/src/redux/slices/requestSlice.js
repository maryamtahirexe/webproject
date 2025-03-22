import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api.js";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async () => {
    const response = await API.get("/requests");
    return response.data;
  }
);

export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (requestData) => {
    const response = await API.post("/requests", requestData);
    return response.data;
  }
);

export const updateRequest = createAsyncThunk(
  "requests/updateRequest",
  async ({ id, ...requestData }) => {
    const response = await API.put(`/requests/${id}`, requestData);
    return response.data;
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async (id) => {
    await API.delete(`/requests/${id}`);
    return id;
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) state.requests[index] = action.payload;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default requestSlice.reducer;
