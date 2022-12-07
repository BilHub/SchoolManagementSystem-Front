import { useState } from "react";

const DetailAddStudent = () => {
  const [blood, setBlood] = useState("");
  const [birthDay, setBirthDay] = useState("");
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
  // const [, set] = useState("");
  return (
    <form className="flex flex-col ml-14 mr-28 gap-5">
      <div className="flex flex-col gap-2">
        <p
          className="font-bold text-primary-green italic after:h-[2px] after:bg-primary-green after:flex
      after:align-middle mb-1"
        >
          General informations
        </p>
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
            id="birthDay"
            onChange={(e) => setBirthDay(e.target.value)}
            value={birthDay}
            placeholder="Date of birth"
            required
          ></input>
        </div>
        <div className="flex gap-3">
          <label className="w-[200px]">City :</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[300px] bg-white outline outline-gray-200"
            placeholder="city"
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
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-[300px] bg-white outline outline-gray-200"
            placeholder="state"
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
            value={address}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          ></input>
        </div>
      </div>
      <div className="flex justify-center m-5">
        <button className="bg-primary-green w-[80px] p-1 rounded-lg text-white text-xl hover:bg-primary-yellow">
          Save
        </button>
      </div>
    </form>
  );
};

export default DetailAddStudent;
