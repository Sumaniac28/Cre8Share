import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchUserData=createAsyncThunk(
    'user/fetchUserData',
    async ()=>{
        const response = await axiosInstance.get('v1/usersAPI');
        return response.data;
    }
)

const userSlice = createSlice({
    name:'User',
    initialState:{
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserData.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchUserData.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.data= action.payload;
        })
        .addCase(fetchUserData.rejected,(state,action)=>{
            state.status='rejected';
            state.error= action.error.message;
        })
    }
})

export default userSlice.reducer;