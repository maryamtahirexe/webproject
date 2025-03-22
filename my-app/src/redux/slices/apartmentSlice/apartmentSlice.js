import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apartments: [],
  loading: false,
  error: null,
};

export const createApartment = createAsyncThunk(
  "apartments/createApartment",
  async (apartmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/apartments",
        apartmentData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllApartments = createAsyncThunk(
  "apartments/getAllApartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/apartments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteApartment = createAsyncThunk(
  "apartments/deleteApartment",
  async (apartmentId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/apartments/${apartmentId}`);
      return apartmentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateApartment = createAsyncThunk(
  "apartments/updateApartment",
  async ({ apartmentId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/apartments/${apartmentId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const apartmentSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createApartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments.push(action.payload);
      })
      .addCase(createApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllApartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = action.payload;
      })
      .addCase(getAllApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteApartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = state.apartments.filter(
          (apartment) => apartment._id !== action.payload
        );
      })
      .addCase(deleteApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.apartments.findIndex(
          (apartment) => apartment._id === action.payload._id
        );
        if (index !== -1) {
          state.apartments[index] = action.payload;
        }
      })
      .addCase(updateApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apartmentSlice.reducer;
