import React from "react";

const Table = ({ dataList, renderHeader, renderRow }) => {
  return (
    <div className="lg:overflow-x-auto mr-3 lg:mr-20">
      <div className="lg:min-w-[800px]">
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
