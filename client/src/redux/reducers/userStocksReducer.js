import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchUserStocks = createAsyncThunk(
    'creator/fetchCreatorAnalytics',
    async ()=>{
        const response = await axiosInstance.get('v1/usersAPI/getPortfolio');
        return response.data;
    }
)

const userStocksSlice = createSlice({
    name:"UserStocks",
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserStocks.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchUserStocks.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.data=action.payload;
        })
        .addCase(fetchUserStocks.rejected,(state,action)=>{
            state.error='rejected';
            state.error= action.error.message;
        })
    }
})

export default userStocksSlice.reducer;