import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "../../constant/App";

interface UserState {
  status: boolean;
  user: any[];
  token: string | null;
  error: string | null;
}

interface UserObject {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  status: false,
  user: [],
  token: null,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userObject: UserObject) => {
    const data = await axios.post(
      `${appConfig.apiUrl}${"/register"}`,
      userObject
    );
    return [];
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userObject: UserObject) => {
    const data = await axios.post(`${appConfig.apiUrl}${"/login"}`, userObject);
    console.log("data", data);

    return data.data.token;
  }
);

const createUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = true;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserObject[]>) => {
          state.status = false;
          state.user = action.payload;
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.status = false;
        state.user = [];
        state.error = action.error.message || "Failed to create user";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.user = [];
        state.error = action.error.message || "Failed to create user";
      });
  },
});

export default createUserSlice.reducer;
