import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// export const fetchUserData=createAsyncThunk(
//     'user/fetchUserData',
//     async ()=>{
//         const response = await axiosInstance.get('v1/usersAPI');
//         return response.data;
//     }
// )

// const userSlice = createSlice({
//     name:'User',
//     initialState:{
//         data:[],
//         status:'idle',
//         error:null
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchUserData.pending,(state)=>{
//             state.status='loading'
//         })
//         .addCase(fetchUserData.fulfilled,(state,action)=>{
//             state.status='fulfilled';
//             state.data= action.payload;
//         })
//         .addCase(fetchUserData.rejected,(state,action)=>{
//             state.status='rejected';
//             state.error= action.error.message;
//         })
//     }
// })

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("v1/usersAPI");
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

const userSlice = createSlice({
  name: "User",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    errorCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Unknown Error";
        state.errorCode = action.payload?.statusCode || 500;
      });
  },
});

export default userSlice.reducer;
