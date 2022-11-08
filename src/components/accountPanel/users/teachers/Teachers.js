import { StudentsListData } from "../../../../data/AdminPanel/StudentsListData";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import "../../../../index.css";
import UserType from "../commun/UserType";

const Students = () => {
  return (
    <div className="flex flex-col">
      <UserType />
      <div className="ml-52">
        <div className="flex items-center justify-between mr-20">
          <p className="text-3xl py-3 text-primary-green ">Teachers List</p>
          <BsFillPlusCircleFill className="text-4xl text-primary-yellow" />
        </div>
        <div className="overflow-x-auto mr-20">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-12 my-2 place-items-center font-semibold italic">
              <p>ID</p>
              <p className="col-span-2">Name</p>
              <p className="col-span-3">Email</p>
              <p className="col-span-2">Phone</p>
              <p className="col-span-2">Class Level</p>
              <p className="col-span-2">Action</p>
            </div>
            <ul>
              {StudentsListData.map((value, index) => {
                return (
                  <li className="odd:bg-gray-200 py-2">
                    <div className="grid grid-cols-12 place-items-center">
                      <p>{value.id}</p>
                      <p className="col-span-2">{value.name}</p>
                      <p className="col-span-3">{value.email}</p>
                      <p className="col-span-2">{value.phone}</p>
                      <p className="col-span-2">{value.level}</p>
                      <p className="col-span-2 flex gap-3 text-xl">
                        <BiShow className="text-primary-green" />
                        <AiFillEdit className="text-primary-yellow" />
                        <AiFillDelete className="text-red-500" />
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
