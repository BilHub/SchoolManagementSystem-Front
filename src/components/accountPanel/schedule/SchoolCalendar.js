import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useQuery } from "@tanstack/react-query";
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
import { useDispatch, useSelector } from "react-redux";
import SelectLevel from "../courses/commun/SelectLevel";
import { resetLevelListRedux } from "../../../redux/courseSlice";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import ModaleEvent from "./ModaleEvent";

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
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const closeModal = () => setShowModal(false);
  const openModal = () => {
    setShowModal(true);
  };
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );

  const navigate = useNavigate();
  const location = useLocation();

  const onSelectEvent = (callEvent) => {
    setSelectedEvent(callEvent);
    openModal();
  };

  const getEvents = async (selectedLevelId) => {
    const response = await scheduleService.getLevelEventList(selectedLevelId);
    const events = response.data.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
    }));
    const spreadEvents = [];
    for (let i = 1; i <= 51; i++) {
      events.map((event) => {
        spreadEvents.push({
          ...event,
          start: new Date(event.start.setDate(event.start.getDate() + 7)),
          end: new Date(event.end.setDate(event.end.getDate() + 7)),
        });
        return event;
      });
    }
    spreadEvents.push({ ...events });
    return spreadEvents;
  };

  const {
    data: queryEventsList = [],
    data,
    error,
    refetch: refetchEventsList,
  } = useQuery(
    ["events-list", selectedLevelId],
    () => getEvents(selectedLevelId),
    {
      enable: selectedLevelId !== "default",
    }
  );

  return (
    <div className="ml-10 mt-5 h-screen flex flex-col justify-center items-center gap-10 w-full">
      {/* <SelectCourses /> */}
      <ModaleEvent
        showModal={showModal}
        closeModal={closeModal}
        selectedEvent={selectedEvent}
        refetchEventsList={refetchEventsList}
      />
      <SelectLevel />
      <div className="absolute top-0 right-0 md:mt-20 md:mr-36 ">
        <div
          className="flex gap-3 items-center text-xl text-primary-yellow cursor-pointer
             hover:text-primary-green font-semibold"
          onClick={() => {
            navigate("add_event", {
              state: location.pathname,
            });
          }}
        >
          <p className="hidden md:block">New</p>
          <BsFillPlusCircleFill className="w-10 h-10" />
        </div>
      </div>
      <Calendar
        className="w-4/5"
        localizer={localizer}
        events={queryEventsList}
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
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default SchoolCalendar;
