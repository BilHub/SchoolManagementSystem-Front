import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  msg: "",
  user: "",
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  error: "",
};

export const register = createAsyncThunk("user/register", async (body) => {
  try {
    const response = await authService.registerAPI(body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const data = await authService.loginAPI({ username, password });
    return {
      accessToken: data.access,
      refreshToken: data.refresh,
      user: data.user,
    };
  }
);

export const loadUser = createAsyncThunk("auth/load", async (refreshToken) => {
  const data = await authService.getAccessToken(refreshToken);
  return {
    accessToken: data.access,
  };
});

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
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

// export default authSlice.reducer;
const { reducer } = authSlice;
export default reducer;
