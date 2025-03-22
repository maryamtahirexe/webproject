import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api.js";

export const fetchTenants = createAsyncThunk(
  "tenants/fetchTenants",
  async () => {
    const response = await API.get("/tenants");
    return response.data;
  }
);

export const createTenant = createAsyncThunk(
  "tenants/createTenant",
  async (tenantData) => {
    const response = await API.post("/tenants", tenantData);
    return response.data;
  }
);

export const updateTenant = createAsyncThunk(
  "tenants/updateTenant",
  async ({ id, ...tenantData }) => {
    const response = await API.put(`/tenants/${id}`, tenantData);
    return response.data;
  }
);

export const deleteTenant = createAsyncThunk(
  "tenants/deleteTenant",
  async (id) => {
    await API.delete(`/tenants/${id}`);
    return id;
  }
);

const tenantSlice = createSlice({
  name: "tenants",
  initialState: {
    tenants: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants.push(action.payload);
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTenant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tenants.findIndex(
          (tenant) => tenant._id === action.payload._id
        );
        if (index !== -1) state.tenants[index] = action.payload;
      })
      .addCase(updateTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = state.tenants.filter(
          (tenant) => tenant._id !== action.payload
        );
      })
      .addCase(deleteTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tenantSlice.reducer;
