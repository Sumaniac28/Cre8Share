import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchCreatorStocks = createAsyncThunk(
  "creator/fetchCreatorStocks",
  async () => {
    const response = await axiosInstance.get("v1/stocksAPI");
    return response.data;
  }
);

const creatorStocksSlice = createSlice({
    name:'CreatorStocks',
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCreatorStocks.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchCreatorStocks.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.data= action.payload;
        })
        .addCase(fetchCreatorStocks.rejected,(state,action)=>{
            state.status='rejected';
            state.error= action.error.message;
        })
    }
})

export default creatorStocksSlice.reducer;