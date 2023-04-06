import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coursesAPI from "../components/accountPanel/courses/commun/CourseAPI";

const initialState = {
  error: false,
  cycleList: [],
  levelList: [],
  classList: [],
  selectedCycleId: "",
  selectedLevelId: "",
  selectedClassId: "" | [],
  date: "",
};

export const getCycleListRedux = createAsyncThunk(
  "courses/cycleList",
  async () => {
    try {
      const cycleResponse = await coursesAPI.getCyclelListAPI();
      console.log("cycle_list: ", cycleResponse.data);
      return { cycle_list: cycleResponse.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLevelListRedux = createAsyncThunk(
  "courses/levelList",
  async (id) => {
    try {
      const levelResponse = await coursesAPI.getLevelListAPI(id);
      return { level_list: levelResponse.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getClassListRedux = createAsyncThunk(
  "courses/classList",
  async ({ selectedCycleId, selectedLevelId }, _) => {
    try {
      const classResponse = await coursesAPI.getClassListAPI(
        selectedCycleId,
        selectedLevelId
      );
      return { class_list: classResponse.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetClassListRedux = createAsyncThunk(
  "courses/resetClassList",
  async () => {
    return { class_list: [] };
  }
);

export const resetLevelListRedux = createAsyncThunk(
  "courses/resetLevelList",
  async () => {
    return { level_list: [] };
  }
);
export const resetCycleListRedux = createAsyncThunk(
  "courses/resetCycleList",
  async () => {
    return { cycle_list: [] };
  }
);

export const setSelectedCycleIdRedux = createAsyncThunk(
  "courses/selectedCycleId",
  async (value) => {
    const id = value;
    return { cycle_id: id };
  }
);

export const setSelectedLevelIdRedux = createAsyncThunk(
  "courses/selectedLevelId",
  async (value) => {
    const id = value;
    return { level_id: id };
  }
);

export const setSelectedClassIdRedux = createAsyncThunk(
  "courses/selectedClassId",
  async (value) => {
    const id = value;
    return { class_id: id };
  }
);

export const setDateRedux = createAsyncThunk(
  "courses/dateCourse",
  async (value) => {
    const dateCourse = value;
    return { date_course: dateCourse };
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  extraReducers: {
    [getCycleListRedux.fulfilled]: (state, action) => {
      state.cycleList = action.payload.cycle_list;
    },
    [getCycleListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [getLevelListRedux.fulfilled]: (state, action) => {
      state.levelList = action.payload.level_list;
    },
    [getLevelListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [getClassListRedux.fulfilled]: (state, action) => {
      state.classList = action.payload.class_list;
    },
    [getClassListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [resetClassListRedux.fulfilled]: (state, action) => {
      state.classList = action.payload.class_list;
    },
    [resetClassListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [resetLevelListRedux.fulfilled]: (state, action) => {
      state.levelList = action.payload.level_list;
    },
    [resetLevelListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [resetCycleListRedux.fulfilled]: (state, action) => {
      state.cycleList = action.payload.cycle_list;
    },
    [resetCycleListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [setSelectedCycleIdRedux.fulfilled]: (state, action) => {
      state.selectedCycleId = action.payload.cycle_id;
    },
    [setSelectedCycleIdRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [setSelectedLevelIdRedux.fulfilled]: (state, action) => {
      state.selectedLevelId = action.payload.level_id;
    },
    [setSelectedLevelIdRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [setSelectedClassIdRedux.fulfilled]: (state, action) => {
      state.selectedClassId = action.payload.class_id;
    },
    [setSelectedClassIdRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [setDateRedux.fulfilled]: (state, action) => {
      state.date = action.payload.date_course;
    },
    [setDateRedux.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

const { reducer } = courseSlice;
export default reducer;
