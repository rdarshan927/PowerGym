import React, { useState } from "react";

const ScheduleDay = ({ day, onScheduleChange }) => {
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCheckboxChange = () => {
    setChecked(!checked);
    if (!checked) {
      onScheduleChange(day, { startTime: "", endTime: "" });
    }
  };

  const handleTimeChange = (type, value) => {
    if (type === "start") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }

    if (startTime && endTime) {
      onScheduleChange(day, { startTime, endTime });
    }
  };

  return (
    <div className="flex items-center space-x-3 mt-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="w-5 h-5"
      />
      <span className="font-medium">{day}</span>

      <input
        type="time"
        value={startTime}
        onChange={(e) => handleTimeChange("start", e.target.value)}
        disabled={!checked}
        className={`border p-2 rounded w-1/3 ${!checked && "bg-gray-200"}`}
      />

      <input
        type="time"
        value={endTime}
        onChange={(e) => handleTimeChange("end", e.target.value)}
        disabled={!checked}
        className={`border p-2 rounded w-1/3 ${!checked && "bg-gray-200"}`}
      />
    </div>
  );
};

export default ScheduleDay;
