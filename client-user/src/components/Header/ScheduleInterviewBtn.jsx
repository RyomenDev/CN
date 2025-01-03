import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "../../utils/toaster";

const SeheduleInterviewBtn = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("default");
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const handleLoginClick = () => {
    if (authStatus) {
      navigate("/schedule-interview");
    } else {
      setToastMessage("Need login to access this feature.");
      setToastType("error");
    }
  };

  return (
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          setToastMessage={setToastMessage}
        />
      )}
      <button
        onClick={handleLoginClick}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        schedule-Interview
      </button>
    </div>
  );
};

export default SeheduleInterviewBtn;
