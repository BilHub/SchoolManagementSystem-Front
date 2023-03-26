import React from "react";

const Table = ({ dataList, renderHeader, renderRow }) => {
  return (
    <div className="md:overflow-x-auto mr-3 md:mr-20">
      <div className="md:min-w-[800px]">
        {renderHeader()}

        <ul>
          {dataList.map((item, index) => {
            return (
              <li key={index} className="odd:bg-gray-200 p-2">
                {renderRow(item)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Table;
