import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  msg: "",
  user: "",
  accessToken: "",
  isLoggedIn: false,
  error: "",
};

export const register = createAsyncThunk("user/register", async (body) => {
  console.log("dispatch action from registerForm executed");

  try {
    const response = await authService.registerAPI(body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const data = await authService.loginAPI({ username, password });
    console.log("tokens are:", data);
    return { accessToken: data.access, user: data.user };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logoutAPI();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

// export default authSlice.reducer;
const { reducer } = authSlice;
export default reducer;