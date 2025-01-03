import React, { useState } from "react";

const StatusButton = ({ currentStatus, onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to change the status to ${newStatus}?`
    );
    if (isConfirmed) {
      setStatus(newStatus);
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`${
          status === "Cancelled" ? "bg-red-500" : "bg-gray-300"
        } text-white p-2 rounded-md`}
        onClick={() => handleStatusChange("Cancelled")}
      >
        Cancelled
      </button>
      <button
        className={`${
          status === "Completed" ? "bg-green-500" : "bg-gray-300"
        } text-white p-2 rounded-md`}
        onClick={() => handleStatusChange("Completed")}
      >
        Completed
      </button>
      <button
        className={`${
          status === "Accepted" ? "bg-blue-500" : "bg-gray-300"
        } text-white p-2 rounded-md`}
        onClick={() => handleStatusChange("Accepted")}
      >
        Accepted
      </button>
    </div>
  );
};

export default StatusButton;
