import React, { useState } from "react";
import { CoursesPart } from "../commun/CoursesPart";
import TableLevel from "./TableLevel";
import coursesService from "../../../../services/coursesService";
import { useQuery } from "@tanstack/react-query";
import AddLevel from "./AddLevel";

const Level = () => {
  const { data: queryLevelList = [], refetch } = useQuery(
    ["level-list"],
    coursesService.fetchLevelList
  );

  const [levelList, setLevelList] = useState(null);
  return (
    <div className="mt-22 md:ml-52">
      <CoursesPart />
      <AddLevel refetch={refetch} />
      <TableLevel
        levelList={levelList ? levelList : queryLevelList}
        refetch={refetch}
        setLevelList={setLevelList}
      />
    </div>
  );
};

export default Level;
