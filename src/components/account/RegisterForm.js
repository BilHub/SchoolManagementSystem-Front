import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    school_name: "",
    subdomain: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();

  const Register = () => {
    console.log("register button clicked");
    const payload = {
      school_name: registerData.school_name,
      subdomain: registerData.subdomain,
      admins: [
        {
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          username: registerData.username,
          password: registerData.password,
          email: registerData.email,
        },
      ],
    };
    dispatch(register(payload));
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-primary-green h-screen items-center">
      <div className="flex flex-col bg-white gap-1 p-5 mt-10 w-96 text-xs">
        <div className="flex text-3xl gap-5">
          <p>
            <Link to="/login">Login</Link>
          </p>
          <span>|</span>
          <p className="text-primary-green font-bold">Register</p>
        </div>
        <input
          type="text"
          value={registerData.school_name}
          onChange={(e) =>
            setRegisterData({ ...registerData, school_name: e.target.value })
          }
          placeholder="School name (exemple: schooly One)"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="text"
          value={registerData.subdomain}
          onChange={(e) =>
            setRegisterData({ ...registerData, subdomain: e.target.value })
          }
          placeholder="Subdomain (exemple: /schoolt_one)"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="text"
          value={registerData.first_name}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              first_name: e.target.value,
            })
          }
          placeholder="first_name"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="text"
          value={registerData.last_name}
          onChange={(e) =>
            setRegisterData({ ...registerData, last_name: e.target.value })
          }
          placeholder="last_name"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="text"
          value={registerData.username}
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
          placeholder="username"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="text"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          placeholder="email"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          placeholder="password"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="confirm password"
          className="outline-none border p-2 rounded-md"
        />
      </div>
      <button
        className="m-5 rounded-md bg-white p-2 text-primary-green font-semibold hover:bg-primary-green hover:text-white"
        onClick={Register}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
