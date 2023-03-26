import { Calendar, dateFnsLocalizer } from "react-big-calendar";
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


const SchoolCalendar = () => {
  const [eventList, setEventList] = useState([]);

  const events = eventList.map(event => {
    return {
    title:event.title,
    addDay:true,
    start:new Date(event.start_time),
    end:new Date(event.end_time)
  }
  })


  useEffect(()=>{
    scheduleService.getEventList().then(response => {
      setEventList(response.data)
    })
  },[])

  return (
    <div className="ml-44 mt-24">
      <Calendar
        className="h-[800px] w-[800px]"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default SchoolCalendar;
