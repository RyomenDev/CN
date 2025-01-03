import { useEffect, useState } from "react";
import { getUserInterviews } from "../api/index"; // Replace with the actual API function
import { useNavigate } from "react-router-dom";

const InterviewStatus = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user interviews when the component mounts
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getUserInterviews();
        setInterviews(data.interviews || []);
      } catch (err) {
        setError("Error fetching interview data");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const formatDateTime = (scheduledDate) => {
    const dateObj = new Date(scheduledDate);

    const date = dateObj.toLocaleDateString("en-US", {
      timeZone: "UTC",
    });

    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    const endTimeObj = new Date(dateObj.getTime() + 30 * 60 * 1000);
    const endTime = endTimeObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    return { date, time, endTime };
  };

  return (
    <div className="p-8 sm:p-2 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-gray-100 mb-6 text-center">
        Your Interviews
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-400 animate-pulse">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-lg text-red-500 font-semibold">
          {error}
        </div>
      ) : interviews.length === 0 ? (
        <div className="text-center text-lg text-gray-400">
          You have no upcoming interviews.
        </div>
      ) : (
        <div className="space-y-6">
          {interviews.map((interview) => {
            const { date, time, endTime } = formatDateTime(
              interview.scheduledDate
            );

            return (
              <div
                key={interview._id}
                className="flex flex-col justify-around p-6 bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 sm:flex-row items-start"
              >
                <div>
                  <p className="font-semibold text-gray-100">
                    <span className="text-indigo-400">Topic:</span>{" "}
                    {interview?.notes}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-indigo-400">Date:</span> {date}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-indigo-400">Time:</span> {time} -{" "}
                    {endTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="text-indigo-400">Status:</span>{" "}
                    {interview?.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InterviewStatus;
