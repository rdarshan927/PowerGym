import React, { useState } from "react";
import ScheduleDay from "./ScheduleDay";

const ScheduleForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recurrence, setRecurrence] = useState("weekdays");
  const [schedules, setSchedules] = useState({});

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleScheduleChange = (day, time) => {
    setSchedules((prev) => ({
      ...prev,
      [day]: time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Schedule:", {
      startDate,
      endDate,
      recurrence,
      schedules,
    });
  };

  return (
    <div className="content bg-gray-50" style={{ overflowY: "auto", height: "100vh" }}>
      <div className="container mx-auto my-8">
        <div className="card shadow-lg rounded-lg bg-white overflow-hidden">
          <div className="card-body">
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Schedule</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Select Availability */}
                <div className="space-y-4">
                  <label className="block font-medium text-gray-700">Select Availability</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Select Recurrence */}
                <div className="space-y-4">
                  <label className="block font-medium text-gray-700">Select Recurrence</label>
                  <select
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="custom">Custom Days</option>
                  </select>
                </div>

                {/* Add Schedules */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">Add Schedules</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    You can include a maximum of six schedules within a single day.
                  </p>
                  {/* Adjusted grid layout for better alignment */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {daysOfWeek.map((day, index) => (
                      <ScheduleDay
                        key={index}
                        day={day}
                        onScheduleChange={handleScheduleChange}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Submit Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
