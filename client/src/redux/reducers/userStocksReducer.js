import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchUserStocks = createAsyncThunk(
  "user/fetchUserStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("v1/usersAPI/getPortfolio");
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue({
          statusCode: err.response.status,
          message: err.response.data.message || "Something went wrong",
        });
      } else {
        return rejectWithValue({
          statusCode: 500,
          message: "Server Error. Please try again later.",
        });
      }
    }
  }
);

const userStocksSlice = createSlice({
  name: "UserStocks",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    errorCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStocks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserStocks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserStocks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Unknown Error";
        state.errorCode = action.payload?.statusCode || 500;
      });
  },
});

export default userStocksSlice.reducer;
