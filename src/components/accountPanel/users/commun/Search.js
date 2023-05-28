import React, { useState } from "react";

import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  setSelectedClassIdRedux,
  setSelectedCycleIdRedux,
  setSelectedLevelIdRedux,
} from "../../../../redux/courseSlice";

const Search = ({ queryList, getSelectedItem, getAllItems }) => {
  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const list = queryList.map((item) => {
    const new_item = {
      id: item.id,
      value: item.first_name + " " + item.last_name,
      label: item.first_name + " " + item.last_name,
    };
    return new_item;
  });
  const handleSelect = (selected) => {
    setSelectedItemId(selected.id);
    setSelectedOption(selected);
  };

  const handleSearch = () => {
    getSelectedItem(selectedItemId);
    setSelectedOption(null);
    setSelectedItemId(null);
    dispatch(setSelectedCycleIdRedux("default"));
    dispatch(setSelectedLevelIdRedux("default"));
    dispatch(setSelectedClassIdRedux("default"));
  };

  return (
    <div className="md:ml-44 mt-14 mb-5 flex justify-center items-center gap-1 flex-col md:flex-row">
      <p className="font-semibold italic">Search by name:</p>
      <div className="flex gap-1 items-center">
        <button
          className="bg-primary-green p-2 rounded-md text-white font-semibold hover:bg-primary-yellow"
          onClick={getAllItems}
        >
          All
        </button>
        <Select
          className="w-64 "
          options={list}
          onChange={handleSelect}
          value={selectedOption}
        />
        <div
          onClick={handleSearch}
          className="text-3xl text-primary-green hover:text-primary-yellow hover:scale-125 cursor-pointer"
        >
          <BiSearchAlt2 />
        </div>
      </div>
    </div>
  );
};

export default Search;
