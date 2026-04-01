import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDeals } from "../services/dealService";

export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async (params)=>{
    return await getDeals(params);
  }
);

const slice = createSlice({
  name:"deals",
  initialState:{
    data:[],
    total:0,
    loading:false,
    error:null
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchDeals.pending,(state)=>{
        state.loading=true;
      })
      .addCase(fetchDeals.fulfilled,(state,action)=>{
        state.loading=false;
        state.data=action.payload.data;
        state.total=action.payload.total;
      })
      .addCase(fetchDeals.rejected,(state)=>{
        state.loading=false;
        state.error="Error fetching deals";
      });
  }
});

export default slice.reducer;