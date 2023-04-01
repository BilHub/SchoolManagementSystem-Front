import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import scheduleService from "../../../services/scheduleService";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import "./index.css";
import SelectCourses from "../courses/commun/SelectCourses";
import { useSelector } from "react-redux";
import SelectLevel from "../courses/commun/SelectLevel";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SchoolCalendar = ({ showToolBar }) => {
  const [eventList, setEventList] = useState([]);
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );

  const events = eventList.map((event) => {
    return {
      title: event.title,
      addDay: true,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
    };
  });

  // const targetDate = events[0]["start"];
  // const newDay = events[0]["start"].getDate() + 7;

  // console.log("targetDate: ", targetDate);
  // console.log("newDay: ", newDay);
  // console.log("the wanted date: ", new Date(targetDate.setDate(newDay)));
  // const WeeksArray = Array.from({ length: 52 }, (_, i) => i + 1);

  const allEvents = eventList.map((event) => {
    return {
      title: event.title,
      addDay: true,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
    };
  });
  for (let i = 1; i <= 51; i++) {
    events.map((event) => {
      allEvents.push({
        ...event,
        start: new Date(event.start.setDate(event.start.getDate() + 7)),
        end: new Date(event.end.setDate(event.end.getDate() + 7)),
      });
      return event;
    });
  }

  useEffect(() => {
    scheduleService.getEventList(selectedLevelId).then((response) => {
      setEventList(response.data);
    });
  }, [selectedClassId]);

  return (
    <div className="ml-10 mt-5 h-screen flex flex-col justify-center items-center gap-10 w-full">
      {/* <SelectCourses /> */}
      <SelectLevel />
      <Calendar
        className="w-4/5"
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView={"week"}
        // views={["day", "week"]}
        // date={new Date("2023-03-22")}
        toolbar={showToolBar ?? true}
        min={new Date("2023-03-22 08:00:00")}
        max={new Date("2023-03-22 22:00:00")}
        // formats={{
        //   dayRangeHeaderFormat: (date) =>
        //     moment(date).format("dddd - DD/MM/YYYY"),
        // }}
      />
    </div>
  );
};

export default SchoolCalendar;
