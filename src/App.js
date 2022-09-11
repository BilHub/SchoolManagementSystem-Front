import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import RegisterForm from "./components/account/RegisterForm";
import LoginForm from "./components/account/LoginForm";
import Dashboard from "./components/accountPanel/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin_panel" element={<Dashboard />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
