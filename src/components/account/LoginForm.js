import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { useOnKeyPress } from "../../hooks/useOnKeyPress";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Login = async () => {
    dispatch(login({ username, password }));
    const user = JSON.parse(localStorage.getItem("user"));
    navigate(`${user.subdomain}/admin_panel`);
  };

  useOnKeyPress(Login, "Enter");
  return (
    <div className="flex flex-col bg-primary-green h-screen items-center">
      <div className="flex flex-col bg-white gap-3 p-5 mt-20 w-96 text-xs">
        <div className="flex text-3xl gap-5">
          <p className="text-primary-green font-bold">Login</p>
          <span>|</span>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border p-2 rounded-md"
        />
      </div>
      <button
        className="m-5 rounded-md bg-white p-2 text-primary-green font-semibold hover:bg-primary-green
       hover:text-white"
        onClick={Login}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const Login = async () => {
//     await dispatch(login({ username, password }));
//     const user = JSON.parse(localStorage.getItem("user"));
//     navigate(`${user.subdomain}/admin_panel`);
//   };

//   useOnKeyPress(Login, "Enter");
//   return (
//     <div className="flex flex-col bg-primary-green h-screen items-center">
//       <div className="flex flex-col bg-white gap-3 p-5 mt-20 w-96 text-xs">
//         <div className="flex text-3xl gap-5">
//           <p className="text-primary-green font-bold">Login</p>
//           <span>|</span>
//           <p>
//             <Link to="/register">Register</Link>
//           </p>
//         </div>
//         <input
//           type="text"
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="outline-none border p-2 rounded-md"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="outline-none border p-2 rounded-md"
//         />
//       </div>
//       <button
//         className="m-5 rounded-md bg-white p-2 text-primary-green font-semibold hover:bg-primary-green
//        hover:text-white"
//         onClick={Login}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginForm;
