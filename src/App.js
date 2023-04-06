import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import RegisterForm from "./components/account/RegisterForm";
import LoginForm from "./components/account/LoginForm";
import Dashboard from "./components/accountPanel/dashboard/Dashboard";
import AccountLayout from "./components/accountPanel/accountLayout/AccountLayout";
import Students from "./components/accountPanel/users/students/Students";
import Teachers from "./components/accountPanel/users/teachers/Teachers";
import AddStudent from "./components/accountPanel/users/students/AddStudent";
import { AdminProvider } from "./context/AdminContext";
import EditStudent from "./components/accountPanel/users/students/EditStudent";
import Class from "./components/accountPanel/courses/class/Class";
import Level from "./components/accountPanel/courses/level/Level";
import AttendanceStudents from "./components/accountPanel/attendance/students/AttendanceStudents";
import AttendanceTeachers from "./components/accountPanel/attendance/teachers/AttendanceTeachers";
import AddAttendanceStudents from "./components/accountPanel/attendance/students/AddAttendanceStudents";
import SchoolCalendar from "./components/accountPanel/schedule/SchoolCalendar";
import FinanceStudents from "./components/accountPanel/finance/FinanceStudents";
import FinanceStudentDetail from "./components/accountPanel/finance/FinanceStudentDetail";
import FinanceStudentEdit from "./components/accountPanel/finance/FinanceStudentEdit";
import AddTeacher from "./components/accountPanel/users/teachers/AddTeacher";
import EditTeacher from "./components/accountPanel/users/teachers/EditTeacher";
import EditLevel from "./components/accountPanel/courses/level/EditLevel";
import EditSubject from "./components/accountPanel/courses/class/EditSubject";
import Cycle from "./components/accountPanel/courses/section/Cycle";
import EditCycle from "./components/accountPanel/courses/section/EditCycle";
import Parents from "./components/accountPanel/users/parents/Parents";
import Staff from "./components/accountPanel/users/staff/Staff";
import EditStudentAttendance from "./components/accountPanel/attendance/students/EditStudentAttendance";
import AddEvent from "./components/accountPanel/schedule/AddEvent";
import EditEvent from "./components/accountPanel/schedule/EditEvent";

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route element={<AccountLayout />}>
            <Route
              path="/:subdomain/admin_panel/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/:subdomain/admin_panel/users/students"
              element={<Students />}
            />
            <Route
              path="/:subdomain/admin_panel/users/students/add_student"
              element={<AddStudent />}
            />
            <Route
              path="/:subdomain/admin_panel/users/teachers"
              element={<Teachers />}
            />
            <Route
              path="/:subdomain/admin_panel/users/parents"
              element={<Parents />}
            />
            <Route
              path="/:subdomain/admin_panel/users/staff"
              element={<Staff />}
            />
            <Route
              path="/:subdomain/admin_panel/users/teachers/add_teacher"
              element={<AddTeacher />}
            />
            <Route
              path="/:subdomain/admin_panel/users/students/edit_student/:id"
              element={<EditStudent />}
            />
            <Route
              path="/:subdomain/admin_panel/users/teachers/edit_teacher/:id"
              element={<EditTeacher />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/subject"
              element={<Class />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/subject/edit_subject/:id"
              element={<EditSubject />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/level"
              element={<Level />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/level/edit_level/:id"
              element={<EditLevel />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/cycle"
              element={<Cycle />}
            />
            <Route
              path="/:subdomain/admin_panel/courses/cycle/edit_cycle/:id"
              element={<EditCycle />}
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
              element={<EditStudentAttendance />}
            />
            <Route
              path="/:subdomain/admin_panel/attendance/students/add_attendance"
              element={<AddAttendanceStudents />}
            />
            <Route
              path="/:subdomain/admin_panel/schedule"
              element={<SchoolCalendar />}
            />
            <Route
              path="/:subdomain/admin_panel/schedule/add_event"
              element={<AddEvent />}
            />
            <Route
              path="/:subdomain/admin_panel/schedule/edit_event/:id"
              element={<EditEvent />}
            />
            <Route
              path="/:subdomain/admin_panel/finance/students"
              element={<FinanceStudents />}
            />
            <Route
              path="/:subdomain/admin_panel/finance/students/:id"
              element={<FinanceStudentDetail />}
            />
            <Route
              path="/:subdomain/admin_panel/finance/students/:id/edit"
              element={<FinanceStudentEdit />}
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
