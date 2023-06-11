import React, { useState } from "react";
import { CoursesPart } from "../commun/CoursesPart";
import coursesService from "../../../../services/coursesService";
import { useQuery } from "@tanstack/react-query";
import TableCycle from "./TableCycle";
import AddCycle from "./AddCycle";

const Cycle = () => {
  const { data: queryCycleList = [], refetch } = useQuery(
    ["level-list"],
    coursesService.getCycleList
  );

  const [cycleList, setCycleList] = useState(null);
  return (
    <div className="md:ml-52 mt-22 md:mr-16">
      <CoursesPart />
      <AddCycle refetch={refetch} />
      <TableCycle
        cycleList={cycleList ? cycleList : queryCycleList}
        refetch={refetch}
        setCycleList={setCycleList}
      />
    </div>
  );
};

export default Cycle;
