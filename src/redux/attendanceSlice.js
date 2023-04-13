import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/backend.instance";

const initialState = {
  studentsAttendance: [],
};

const getStudentsListAPI = (id) => {
  return api.get(`api/v1/students/students_subject/?subjectId=${id}`, {
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
    },
  });
  // .then((response) => {
  //   response.data.map((item) => {
  //     return {
  //       first_name: item.first_name,
  //       last_name: item.last_name,
  //       status: "present",
  //       comment: "",
  //     };
  //   });
  // })
  // .catch((error) => console.log(error))
};

const modifyStudentsList = (array) => {
  return array.map((item) => {
    return {
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      status: "present",
      comment: "",
    };
  });
};

export const getStudentsAttendanceRedux = createAsyncThunk(
  "attendance/studentsList",
  async (subjectId) => {
    try {
      const result = await getStudentsListAPI(subjectId);
      if (result.data) {
        const List = modifyStudentsList(result.data);
        return { attendanceList: List };
      }
      //   const List = response.data.map((item) => {
      //     return {
      //       first_name: item.first_name,
      //       last_name: item.last_name,
      //       status: "present",
      //       comment: "",
      //     };
      //   });
    } catch (error) {
      // console.log(error);
    }
  }
);
// export const getAllStudentsAttendanceRedux = createAsyncThunk(
//   "attendance/AllStudentsAttendanceList",
//   async (subjectId) => {
//     try {
//       const result = await getStudentsListAPI(subjectId);
//       if (result.data) {
//         const List = modifyStudentsList(result.data);
//         return { attendanceList: List };
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const resetStudentsListRedux = createAsyncThunk(
  "attendance/resetStudentsList",
  () => {
    return { resetList: [] };
  }
);

export const updateStudentsAttendanceRedux = createAsyncThunk(
  "attendance/updateStatus",
  (arr) => {
    return { updatedList: arr };
  }
);

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  extraReducers: {
    [getStudentsAttendanceRedux.fulfilled]: (state, action) => {
      state.studentsAttendance = action.payload.attendanceList;
    },
    [getStudentsAttendanceRedux.rejected]: (state, action) => {
      state.error = true;
    },
    // [getAllStudentsAttendanceRedux.fulfilled]: (state, action) => {
    //   state.studentsAttendance = action.payload.attendanceList;
    // },
    // [getAllStudentsAttendanceRedux.rejected]: (state, action) => {
    //   state.error = true;
    // },
    [resetStudentsListRedux.fulfilled]: (state, action) => {
      state.studentsAttendance = action.payload.resetList;
    },
    [resetStudentsListRedux.rejected]: (state, action) => {
      state.error = true;
    },
    [updateStudentsAttendanceRedux.fulfilled]: (state, action) => {
      state.studentsAttendance = action.payload.updatedList;
    },
    [updateStudentsAttendanceRedux.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

const { reducer } = attendanceSlice;
export default reducer;
