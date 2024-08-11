import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

export const fetchCreatorData = createAsyncThunk(
    'creator/fetchCreatorData',
    async ()=>{
       const response = await axiosInstance.get('v1/creatorsAPI');
       return response.data;
    }
);

    const creatorSlice = createSlice({
        name:'Creator',
        initialState:{
            data:[],
            status:'idle',
            error:null
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(fetchCreatorData.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchCreatorData.fulfilled,(state,action)=>{
                state.status='fulfilled';
                state.data=action.payload;
            })
            .addCase(fetchCreatorData.rejected,(state,action)=>{
                state.status='rejected';
                state.error=action.error ;
            })
        }
    })

    export default creatorSlice.reducer;