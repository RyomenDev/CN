import { useState } from "react";
import CalendlyBooking from "./CalendlyBooking";
import InterviewStatus from "./InterviewStatus";

const DockerEvent = () => {
  // State to toggle the visibility of CalendlyBooking component
  const [showCalendly, setShowCalendly] = useState(false);

  // Function to toggle the showCalendly state
  const toggleCalendly = () => {
    setShowCalendly(!showCalendly);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center lg:p-4">
        <div className="bg-gray-800 shadow-2xl rounded-lg w-full p-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-6">
            Book an Interview
          </h1>
          <p className="text-lg text-center text-gray-300 mb-8">
            Schedule a convenient time for your Docker event discussion. Choose
            from the available time slots below and make sure you don't miss
            out!
          </p>

          {/* Button to schedule a new interview */}
          <div className="flex justify-center mt-6">
            <button
              onClick={toggleCalendly}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {showCalendly ? "Hide Scheduling" : "Schedule a New Interview"}
            </button>
          </div>

          {/* Show the CalendlyBooking component if the state is true */}
          {showCalendly && (
            <div className="mt-8">
              <CalendlyBooking />
            </div>
          )}

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Need help? Please check the status of your interview above.
            </p>
          </div>
        </div>
        <div className="w-full lg:mt-8">
          <InterviewStatus />
        </div>
      </div>
    </>
  );
};

export default DockerEvent;
