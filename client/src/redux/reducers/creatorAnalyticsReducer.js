import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchCreatorAnalytics = createAsyncThunk(
    'creator/fetchCreatorAnalytics',
    async ()=>{
        const response = await axiosInstance.get('v1/analyticsAPI');
        return response.data;
    }
)

const creatorAnalyticsSlice = createSlice({
    name:"CreatorAnalytics",
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCreatorAnalytics.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchCreatorAnalytics.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.data=action.payload;
        })
        .addCase(fetchCreatorAnalytics.rejected,(state,action)=>{
            state.error='rejected';
            state.error= action.error.message;
        })
    }
})

export default creatorAnalyticsSlice.reducer;