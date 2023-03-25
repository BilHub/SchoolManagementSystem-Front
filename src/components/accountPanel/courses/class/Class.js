import React, { useState } from "react";
import { CoursesPart } from "../commun/CoursesPart";
import AddClass from "./AddClass";
import TableClass from "./TableClass";
import { useQuery } from "@tanstack/react-query";
import coursesService from "../../../../services/coursesService";

const Class = () => {
  const { data: queryClassList = [], refetch } = useQuery(
    ["class-list"],
    coursesService.getClassList
  );
  const [classList, setClassList] = useState(null);

  return (
    <div className="ml-52 mt-22 mr-16">
      <CoursesPart />
      <AddClass refetch={refetch} />
      <TableClass
        classList={classList ? classList : queryClassList}
        refetch={refetch}
        setClassList={setClassList}
      />
    </div>
  );
};

export default Class;
