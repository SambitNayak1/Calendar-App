import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

// Tooltip component
const Tooltip = ({ day, event }) => {
  return (
    <div className="tooltip">
      <p>Day: {day.format("dddd, MMMM DD")}</p>
      <p>Title: {event.title}</p>
      <p>Description: {event.description}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [tooltipEvent, setTooltipEvent] = useState(null);
  const {
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    filteredEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const handleDayClick = () => {
    setDaySelected(day);
    setShowEventModal(true);
    setSelectedEvent(null); // Reset selected event when a day is clicked
  };

  const handleSavedEventClick = (evt) => {
    setSelectedEvent(evt); // Set selected event when a saved event is clicked
    setShowEventModal(true);
  };

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
          onClick={handleDayClick}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onMouseOver={() => setTooltipEvent(evt)}
            onMouseOut={() => setTooltipEvent(null)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            onClick={() => handleSavedEventClick(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
      {tooltipEvent && <Tooltip day={day} event={tooltipEvent} />}
    </div>
  );
}
