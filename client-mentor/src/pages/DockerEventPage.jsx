import DockerEvent from "../DockerEvent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DockerEventPage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [showDockerEvent, setShowDockerEvent] = useState(false);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Docker Event Management
        </h1>

        {/* Feature Description */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-300">
            Welcome to Docker Event Management! This tool allows you to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>View all upcoming interviews scheduled in the system.</li>
            <li>
              Manage interview events, including updates and cancellations.
            </li>
            <li>Access detailed insights into interview sessions.</li>
          </ul>
        </div>

        {/* Auth Status */}
        {!authStatus ? (
          <div className="text-center space-y-4">
            <p className="text-red-500 font-semibold">
              You need to log in to access these features.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
            >
              Log In Now
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <button
              onClick={() => setShowDockerEvent(!showDockerEvent)}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                showDockerEvent
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {showDockerEvent ? "Hide Event" : "Open Event"}
            </button>

            {/* Conditional Rendering of DockerEvent */}
            {showDockerEvent && (
              <div className="p-4 rounded-md border border-gray-700">
                <DockerEvent />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DockerEventPage;

