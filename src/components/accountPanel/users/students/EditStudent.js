import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";

const EditStudent = () => {
  const { user } = useSelector((state) => state.auth);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [, set] = useState("");

  const [blood, setBlood] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [motherEmail, setMotherEmail] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const editData = {
    first_name: first_name ? first_name : studentInfo.first_name,
    last_name: last_name ? last_name : studentInfo.last_name,
    email: email ? email : studentInfo.email,
    phone: phone ? phone : studentInfo.phone,
    blood: blood ? blood : studentInfo.blood,
    date_of_birth: date_of_birth ? date_of_birth : studentInfo.date_of_birth,
    city: city ? city : studentInfo.city,
    state: state ? state : studentInfo.state,
    // zip: zip ? : studentInfo.,
    // address: address ? : studentInfo.,
    // fatherName: fatherName ? : studentInfo.,
    // motherName: motherName ? : studentInfo.,
    // fatherEmail: fatherEmail? : studentInfo.,
    // motherEmail: motherEmail ? : studentInfo.,
    // fatherPhone: fatherPhone ? : studentInfo.,
    // motherPhone: motherPhone ? : studentInfo.,
  };
  const params = useParams();

  const token = JSON.parse(localStorage.getItem("token"));

  const getStudentData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/v1/students/${params.id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        setStudentInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const edit = async (e) => {
    e.preventDefault();
    console.log("editData: ", editData);
    await axios
      .put(`http://127.0.0.1:8000/api/v1/students/${params.id}/`, editData, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <section className="ml-5 md:ml-44 mt-5">
      <div className="flex flex-row items-center gap-5 text-primary-green">
        <BsArrowLeft
          className="text-3xl font-bold cursor-pointer hover:text-primary-yellow"
          onClick={() => navigate(`${user.subdomain}/admin_panel/students`)}
        />
        <p className="flex mt-auto text-3xl">Edit Student</p>
      </div>
      <form className="flex flex-col ml-14 mr-28 gap-5" onSubmit={edit}>
        <div className="flex flex-col gap-2">
          <p
            className="font-bold text-primary-green italic after:h-[2px] after:bg-primary-green after:flex
      after:align-middle mb-1"
          >
            General informations
          </p>
          <div className="flex gap-3">
            <label className="w-[200px]">First Name :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="first_name"
              // defaultValue={studentInfo.first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              value={first_name ? first_name : studentInfo.first_name}
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Last Name :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="last_name"
              onChange={(e) => setLast_name(e.target.value)}
              value={last_name ? last_name : studentInfo.last_name}
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Email :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email ? email : studentInfo.email}
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Phone :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone ? phone : studentInfo.phone}
              // required
            ></input>
          </div>
          <div className="flex gap-3 ">
            <label className="w-[200px]">Blood Type :</label>
            <select
              value={blood}
              onChange={(e) => setBlood(e.target.value)}
              className="w-[300px] bg-white outline outline-gray-200"
              placeholder="blood"
            >
              <option value="" disabled selected className="text-gray-400">
                --- select blood type ---
              </option>
              <option>blood-1</option>
              <option>blood-2</option>
            </select>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Date of birth :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="date_of_birth"
              onChange={(e) => setDate_of_birth(e.target.value)}
              value={date_of_birth ? date_of_birth : studentInfo.date_of_birth}
              placeholder="Date of birth"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">City :</label>
            <select
              onChange={(e) => setCity(e.target.value)}
              className="w-[300px] bg-white outline outline-gray-200"
              placeholder="city"
              value={city ? city : studentInfo.city}
            >
              <option value="" disabled selected className="text-gray-400">
                --- select city ---
              </option>
              <option>city-1</option>
              <option>city-2</option>
            </select>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">State :</label>
            <select
              onChange={(e) => setState(e.target.value)}
              className="w-[300px] bg-white outline outline-gray-200"
              placeholder="state"
              value={state ? state : studentInfo.state}
            >
              <option value="" disabled selected className="text-gray-400">
                --- select state ---
              </option>
              <option>state-1</option>
              <option>state-2</option>
            </select>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">ZIP :</label>
            <select
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-[300px] bg-white outline outline-gray-200"
              placeholder="ZIP"
            >
              <option value="" disabled selected className="text-gray-400">
                --- select ZIP ---
              </option>
              <option>ZIP-1</option>
              <option>ZIP-2</option>
            </select>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Address :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address ? address : studentInfo.address}
              // required
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p
            className="font-bold text-primary-green italic after:h-[2px] after:bg-primary-green after:flex
      after:align-middle mb-1"
          >
            Parents Informations
          </p>

          <div className="flex gap-3">
            <label className="w-[200px]">Father's full name :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="fatherName"
              onChange={(e) => setFatherName(e.target.value)}
              value={fatherName}
              placeholder="Father's full name"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Father's Email :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="fatherEmail"
              onChange={(e) => setFatherEmail(e.target.value)}
              value={fatherEmail}
              placeholder="Father's Email"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Father's Phone :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="fatherPhone"
              onChange={(e) => setFatherPhone(e.target.value)}
              value={fatherPhone}
              placeholder="Father's Phone"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Mother's full name :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="motherName"
              onChange={(e) => setMotherName(e.target.value)}
              value={motherName}
              placeholder="Mother's full name"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">mother's Email :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="motherEmail"
              onChange={(e) => setMotherEmail(e.target.value)}
              value={motherEmail}
              placeholder="Mother's Email"
              // required
            ></input>
          </div>
          <div className="flex gap-3">
            <label className="w-[200px]">Mother's Phone :</label>
            <input
              className="w-4/5 outline outline-gray-200 p-1"
              type="text"
              id="motherPhone"
              onChange={(e) => setMotherPhone(e.target.value)}
              value={motherPhone}
              placeholder="Mother's Phone"
              // required
            ></input>
          </div>
        </div>
        <div className="flex justify-center m-5">
          <button
            type="submit"
            className="bg-primary-green w-[80px] p-1 rounded-lg text-white text-xl hover:bg-primary-yellow"
          >
            Edit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditStudent;
