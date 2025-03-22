import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shops: [],
  loading: false,
  error: null,
};

export const createShop = createAsyncThunk(
  "shops/createShop",
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/shops",
        shopData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllShops = createAsyncThunk(
  "shops/getAllShops",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/shops");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShop = createAsyncThunk(
  "shops/deleteShop",
  async (shopId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/shops/${shopId}`);
      return shopId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShop = createAsyncThunk(
  "shops/updateShop",
  async ({ shopId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/shops/${shopId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops.push(action.payload);
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllShops.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(getAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.filter((shop) => shop._id !== action.payload);
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shops.findIndex(
          (shop) => shop._id === action.payload._id
        );
        if (index !== -1) {
          state.shops[index] = action.payload;
        }
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
