import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import RegisterForm from "./components/account/RegisterForm";
import LoginForm from "./components/account/LoginForm";
import Dashboard from "./components/accountPanel/Dashboard";
import AccountLayout from "./components/accountPanel/accountLayout/AccountLayout";
import Students from "./components/accountPanel/users/students/Students";
import Teachers from "./components/accountPanel/users/teachers/Teachers";
import AddStudent from "./components/accountPanel/users/students/AddStudent";
import { AdminProvider } from "./context/AdminContext";
import EditStudent from "./components/accountPanel/users/students/EditStudent";
import Class from "./components/accountPanel/courses/class/Class";
import Level from "./components/accountPanel/courses/level/Level";
import Section from "./components/accountPanel/courses/section/Section";
import AttendanceStudents from "./components/accountPanel/attendance/students/AttendanceStudents";
import AttendanceTeachers from "./components/accountPanel/attendance/teachers/AttendanceTeachers";
import EditAttendance from "./components/accountPanel/attendance/students/EditAttendance";
import AddAttendanceStudents from "./components/accountPanel/attendance/students/AddAttendanceStudents";

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route element={<AccountLayout />}>
            <Route path="/:subdomain/admin_panel" element={<Dashboard />} />
            <Route
              path="/:subdomain/admin_panel/students"
              element={<Students />}
            />
            <Route
              path="/:subdomain/admin_panel/teachers"
              element={<Teachers />}
            />
            <Route
              path="/:subdomain/admin_panel/students/add_student"
              element={<AddStudent />}
            />
            <Route
              path="/:subdomain/admin_panel/students/edit_student/:id"
              element={<EditStudent />}
            />
            <Route path="/:subdomain/admin_panel/class" element={<Class />} />
            <Route path="/:subdomain/admin_panel/level" element={<Level />} />
            <Route
              path="/:subdomain/admin_panel/section"
              element={<Section />}
            />
            <Route
              path="/:subdomain/admin_panel/attendance/students"
              element={<AttendanceStudents />}
            />
            <Route
              path="/:subdomain/admin_panel/attendance/teachers"
              element={<AttendanceTeachers />}
            />
            <Route
              path="/:subdomain/admin_panel/attendance/students/edit_attendance/:id"
              element={<EditAttendance />}
            />
            <Route
              path="/:subdomain/admin_panel/attendance/students/add_attendance"
              element={<AddAttendanceStudents />}
            />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;
