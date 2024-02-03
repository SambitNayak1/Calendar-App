import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [location, setLocation] = useState(
    selectedEvent ? selectedEvent.location : ""
  );

  // Time-related state
  const [selectedHour, setSelectedHour] = useState(
    selectedEvent ? dayjs(selectedEvent.day).format("hh") : "12"
  );
  const [selectedMinute, setSelectedMinute] = useState(
    selectedEvent ? dayjs(selectedEvent.day).format("mm") : "00"
  );
  const [selectedSecond, setSelectedSecond] = useState(
    selectedEvent ? dayjs(selectedEvent.day).format("ss") : "00"
  );
  const [selectedAmPm, setSelectedAmPm] = useState(
    selectedEvent ? dayjs(selectedEvent.day).format("A") : "AM"
  );

  function handleSubmit(e) {
    e.preventDefault();
    const timeString = `${selectedHour}:${selectedMinute}:${selectedSecond} ${selectedAmPm}`;
    const dateTime = `${daySelected.format("YYYY-MM-DD")} ${timeString}`;

    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      location, // Add location to the event
      day: dayjs(dateTime).valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Add a description"
            value={description}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="flex items-center">
            <span className="material-icons-outlined text-gray-500">
              location_on
            </span>
            <input
              type="text"
              name="location"
              placeholder="Add location"
              value={location}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <p>{daySelected.format("dddd, MMMM DD")}</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <div className="flex gap-x-2">
            {labelsClasses.map((lblClass, i) => (
              <span
                key={i}
                onClick={() => setSelectedLabel(lblClass)}
                className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
              >
                {selectedLabel === lblClass && (
                  <span className="material-icons-outlined text-white text-sm">
                    check
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hour
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minute
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Second
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={selectedSecond}
              onChange={(e) => setSelectedSecond(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              AM/PM
            </label>
            <select
              value={selectedAmPm}
              onChange={(e) => setSelectedAmPm(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <footer className="flex justify-end border-t pt-4 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
