import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// export const fetchCreatorData = createAsyncThunk(
//     'creator/fetchCreatorData',
//     async ()=>{
//        const response = await axiosInstance.get('v1/creatorsAPI');
//        return response.data;
//     }
// );

//     const creatorSlice = createSlice({
//         name:'Creator',
//         initialState:{
//             data:[],
//             status:'idle',
//             error:null
//         },
//         reducers:{},
//         extraReducers:(builder)=>{
//             builder
//             .addCase(fetchCreatorData.pending,(state)=>{
//                 state.status='loading'
//             })
//             .addCase(fetchCreatorData.fulfilled,(state,action)=>{
//                 state.status='fulfilled';
//                 state.data=action.payload;
//             })
//             .addCase(fetchCreatorData.rejected,(state,action)=>{
//                 state.status='rejected';
//                 state.error=action.error ;
//             })
//         }
//     })

export const fetchCreatorData = createAsyncThunk(
  "creator/fetchCreatorData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("v1/creatorsAPI");
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

const creatorSlice = createSlice({
  name: "Creator",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    errorCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatorData.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchCreatorData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchCreatorData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Unknown Error";
        state.errorCode = action.payload?.statusCode || 500;
      });
  },
});

export default creatorSlice.reducer;
