import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  status: boolean;
  user: any[];
  error: string | null;
}

const initialState: UserState = {
  status: false,
  user: [],
  error: null,
};

export const createUser = createAsyncThunk("user/createUser", async () => {
  return [];
});

const createUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = false;
        state.user = [];
        state.error = action.error.message || "Failed to create user";
      });
  },
});

export default createUserSlice.reducer;
