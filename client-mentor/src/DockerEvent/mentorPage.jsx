import { useState, useEffect } from "react";
import { getAllInterviews } from "../api/index";
import Toast from "../utils/toaster";
import StatusButton from "./StatusButton";
import { changeInterviewStatus } from "../api";
import { handleApiError } from "../utils/handleInterviewApiError";

const MentorPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("default");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getAllInterviews(setToastMessage, setToastType);
        setInterviews(response.data);
        filterInterviews(response.data, showAll);
      } catch (error) {
        handleApiError(error, setToastMessage, setToastType); // Handle error and show toast
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [showAll]);

  const filterInterviews = (data, showAll) => {
    const result = showAll
      ? data
      : data.filter(
          (interview) =>
            interview.status !== "Completed" && interview.status !== "Cancelled"
        );

    setFilteredInterviews(
      result.sort(
        (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedDay = day < 10 ? `0${day}` : day;

    return `${paddedDay}/${paddedMonth}/${year}`;
  };

  const handleStatusChange = async (interviewId, newStatus) => {
    try {
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview._id === interviewId
            ? { ...interview, status: newStatus }
            : interview
        )
      );

      await changeInterviewStatus(interviewId, newStatus);
    } catch (error) {
      handleApiError(error, setToastMessage, setToastType); // Handle error and show toast
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
        Mentor Dashboard
      </h1>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {showAll ? "Hide Cancelled and Completed" : "Show All Interviews"}
      </button>

      {loading ? (
        <div className="text-center text-lg text-gray-400 animate-pulse">
          Loading interviews...
        </div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <div className="space-y-6 w-full max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-300">
            {showAll ? "All Interviews" : "Scheduled Interviews"}
          </h2>
          {filteredInterviews.length === 0 ? (
            <div className="text-center text-lg text-gray-400">
              No interviews to display.
            </div>
          ) : (
            filteredInterviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold text-blue-400">
                  Topic: {interview.notes}
                </h3>
                <p className="text-gray-300">
                  Date: {formatDate(interview.scheduledDate)}
                </p>
                <p className="text-gray-300">Time: {interview.timeSlot}</p>
                <p className="text-gray-300">Status: {interview.status}</p>
                <div className="">
                  <StatusButton
                    currentStatus={interview.status}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(interview._id, newStatus)
                    }
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-400">
                    <span className="font-medium text-blue-300">
                      Student Name:
                    </span>{" "}
                    {interview.student.name}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-blue-300">
                      Student Email:
                    </span>{" "}
                    <a
                      href={`mailto:${interview.student.email}`}
                      className="text-blue-400 hover:underline"
                    >
                      {interview.student.email}
                    </a>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Render Toast component for error */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
};

export default MentorPage;
