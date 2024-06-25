import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api/api";

interface UserState {
  status: boolean;
  user: UserObject | any;
  createUser: string | any;
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
  user: null,
  createUser: {},
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userObject: UserObject) => {
    const { data } = await api.post("/register", userObject);
    return data;
  }
);

export const getUser = createAsyncThunk("getUser/user", async () => {
  const data = await api.get("/protected");
  return data;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userObject: UserObject) => {
    const { data } = await api.post("/login", userObject);
    localStorage.setItem("accessToken", data.accessToken);
    return data;
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
          state.createUser = action.payload;
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to create user";
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.status = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = false;
          state.user = action.payload?.data.user;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to create user";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to login";
      });
  },
});

export default createUserSlice.reducer;
