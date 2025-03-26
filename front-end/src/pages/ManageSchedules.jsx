import React, { useState } from "react";

const ManageSchedules = () => {
  // Sample initial schedule data
  const [schedules, setSchedules] = useState([
    { id: 1, day: "Monday", startTime: "09:00 AM", endTime: "11:00 AM", status: "Not Completed" },
    { id: 2, day: "Wednesday", startTime: "02:00 PM", endTime: "04:00 PM", status: "Completed" },
    { id: 3, day: "Friday", startTime: "10:00 AM", endTime: "12:00 PM", status: "Not Completed" },
  ]);

  const [filter, setFilter] = useState("All");
  const [editSchedule, setEditSchedule] = useState(null);
  const [updatedSchedule, setUpdatedSchedule] = useState({});

  // Toggle status (Completed / Not Completed)
  const toggleStatus = (id) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? {
              ...schedule,
              status: schedule.status === "Completed" ? "Not Completed" : "Completed",
            }
          : schedule
      )
    );
  };

  // Delete schedule
  const handleDelete = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  // Edit schedule (dummy function for now)
  const handleEdit = (schedule) => {
    // alert(`Edit function for schedule ID: ${id}`);
    setEditSchedule(schedule.id);
    setUpdatedSchedule(schedule);
  };

  // Handle update
  const handleUpdate = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editSchedule ? updatedSchedule : schedule
      )
    );
    setEditSchedule(null);
  };

  // Filter schedules based on selection
  const filteredSchedules = schedules.filter(schedule =>
    filter === "All" || schedule.status === filter
  );

  // Generate Report
  const generateReport = () => {
    const completed = schedules.filter(s => s.status === "Completed").length;
    const pending = schedules.filter(s => s.status === "Not Completed").length;
    const total = schedules.length;
    
    alert(`Report:\nTotal: ${total}\nCompleted: ${completed} (${((completed / total) * 100).toFixed(2)}%)\nPending: ${pending} (${((pending / total) * 100).toFixed(2)}%)`);
  };

  return (
    <div className="content" style={{ overflowY: "auto", height: "100vh" }}>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="card" style={{ boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 4px -1px" }}>
          <div className="card-body">
            <div style={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <h2 className="text-xl font-bold mb-4">Manage Schedules</h2>
                
                {/* Filter Dropdown */}
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  className="mb-4 border p-2 rounded"
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
                </select>
                
                {/* Generate Report Button */}
                <button
                  onClick={generateReport}
                  className="ml-4 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  Generate Report
                </button>

                <a
                  href="/addschedule"
                  className="ml-4 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  Create Schedule
                </a>

                {filteredSchedules.length === 0 ? (
                  <p className="text-gray-500">No schedules available.</p>
                ) : (
                  <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Day</th>
                        <th className="border p-2">Start Time</th>
                        <th className="border p-2">End Time</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((schedule) => (
                        <tr key={schedule.id} className="text-center">
                          <td className="border p-2">{schedule.day}</td>
                          {/* <td className="border p-2">{schedule.startTime}</td>
                          <td className="border p-2">{schedule.endTime}</td> */}
                          <td className="border p-2">
                            {editSchedule === schedule.id ? (
                              <input
                                type="time"
                                value={updatedSchedule.startTime}
                                onChange={(e) =>
                                  setUpdatedSchedule({
                                    ...updatedSchedule,
                                    startTime: e.target.value,
                                  })
                                }
                                className="border rounded p-1"
                              />
                            ) : (
                              schedule.startTime
                            )}
                          </td>
                          <td className="border p-2">
                            {editSchedule === schedule.id ? (
                              <input
                                type="time"
                                value={updatedSchedule.endTime}
                                onChange={(e) =>
                                  setUpdatedSchedule({
                                    ...updatedSchedule,
                                    endTime: e.target.value,
                                  })
                                }
                                className="border rounded p-1"
                              />
                            ) : (
                              schedule.endTime
                            )}
                          </td>
                          <td className="border p-2">
                            <span
                              className={`px-2 py-1 rounded ${
                                schedule.status === "Completed"
                                  ? "bg-green-500 text-white"
                                  : "bg-yellow-500 text-white"
                              }`}
                            >
                              {schedule.status}
                            </span>
                          </td>
                          <td className="border p-2">
                            {editSchedule === schedule.id ? (
                              <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                              >
                                Save
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(schedule)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(schedule.id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => toggleStatus(schedule.id)}
                                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                >
                                  Toggle Status
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchedules;
