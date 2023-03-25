import React, { useState } from "react";

import { BiSearchAlt2 } from "react-icons/bi";
import Select from "react-select";

const Search = ({ queryList, getSelectedItem, getAllItems }) => {
  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

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
  };

  return (
    <div className="ml-44 mt-22 flex justify-center items-center my-5 gap-5">
      <p className="font-semibold italic">Search by name:</p>
      <Select
        className="w-64"
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
      <button
        className="bg-primary-green p-2 rounded-md text-white font-semibold hover:bg-primary-yellow"
        onClick={getAllItems}
      >
        All
      </button>
    </div>
  );
};

export default Search;
