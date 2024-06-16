import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchAllStocks=  createAsyncThunk(
  "stocks/fetchAllStocks",
  async () => {
    const response = await axiosInstance.get("v1/stockListAPI");
    return response.data;
  }
);

const stocksMarketPlaceSlice = createSlice({
    name:'stocksMarketPlace',
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllStocks.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchAllStocks.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.data= action.payload;
        })
        .addCase(fetchAllStocks.rejected,(state,action)=>{
            state.status='rejected';
            state.error= action.error.message;
        })
    }
})

export default stocksMarketPlaceSlice.reducer;