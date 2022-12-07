import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import courseReducer from "./redux/courseSlice";
import attendanceReducer from "./redux/attendanceSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  attendance: attendanceReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
