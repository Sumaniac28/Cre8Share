import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// export const fetchAllStocks=  createAsyncThunk(
//   "stocks/fetchAllStocks",
//   async () => {
//     const response = await axiosInstance.get("v1/stockListAPI");
//     return response.data;
//   }
// );

// const stocksMarketPlaceSlice = createSlice({
//     name:'stocksMarketPlace',
//     initialState:{
//         data:[],
//         status:'idle',
//         error:null
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchAllStocks.pending,(state)=>{
//             state.status='loading';
//         })
//         .addCase(fetchAllStocks.fulfilled,(state,action)=>{
//             state.status='fulfilled';
//             state.data= action.payload;
//         })
//         .addCase(fetchAllStocks.rejected,(state,action)=>{
//             state.status='rejected';
//             state.error= action.error.message;
//         })
//     }
// })

export const fetchAllStocks = createAsyncThunk(
  "stocks/fetchAllStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("v1/stockListAPI");
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

const stocksMarketPlaceSlice = createSlice({
  name: "stocksMarketPlace",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    errorCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStocks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchAllStocks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchAllStocks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Unknown Error";
        state.errorCode = action.payload?.statusCode || 500;
      });
  },
});

export default stocksMarketPlaceSlice.reducer;
