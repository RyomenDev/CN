import { useState, useEffect } from "react";
import { scheduleInterview, getAvailableTimeSlots } from "../api/index";
import { useNavigate } from "react-router-dom";
import Toast from "../utils/toaster";
import InterviewOptions from "./InterviewOptions";
import DateAndTimeSelector from "./DateAndTimeSelector";

const CalendlyBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("default");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDateAvailableSlots, setCurrentDateAvailableSlots] = useState(
    []
  );

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const data = await getAvailableTimeSlots();
        const availableSlots = Object.keys(data.availableSlots).map((date) => ({
          date,
          slots: data.availableSlots[date],
        }));
        setAvailableSlots(availableSlots);
      } catch (error) {
        setToastMessage("Failed to load available slots.");
        setToastType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedDay = day < 10 ? `0${day}` : day;

    return `${year}-${paddedMonth}-${paddedDay}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedDateString = date.toLocaleDateString();
    const currDate = formatDate(selectedDateString);

    const selectedSlots = availableSlots.find((slot) => slot.date === currDate);
    if (selectedSlots) {
      setCurrentDateAvailableSlots(selectedSlots.slots);
    } else {
      setCurrentDateAvailableSlots([]);
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime && topic.trim()) {
      const data = {
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        topic,
      };
      try {
        await scheduleInterview(data, navigate, setToastMessage, setToastType);
        setToastMessage("Interview successfully scheduled.");
        setToastType("success");
        // Refresh the page after a short delay to show the success message
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // setToastMessage("Error scheduling the interview.");
        // setToastType("error");
      }
    } else {
      setToastMessage("Please select a date, time slot, and enter a topic.");
      setToastType("warning");
    }
  };

  const availableDates = availableSlots.map((slot) => new Date(slot.date));

  return (
    <div className="container mx-auto  lg:p-6  bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-white p-4">
        Schedule Your Interview
      </h1>

      <div className="flex flex-col lg:flex-row justify-center w-full lg:gap-8 bg-gray-800 shadow-lg rounded-lg lg:p-6 ">
        {/* Left Section: Interview Options */}
        <div className="flex flex-col justify-center w-full lg:w-1/3 bg-gray-700 shadow-md rounded-lg p-4">
          <InterviewOptions topic={topic} onTopicChange={handleTopicChange} />
        </div>

        {/* Right Section: Date and Time Selection */}
        <div className="w-full lg:w-2/3 bg-gray-700 shadow-md rounded-lg lg:p-4">
          <DateAndTimeSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            availableDates={availableDates}
            currentDateAvailableSlots={currentDateAvailableSlots}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            loading={loading}
            maxDate={maxDate}
          />
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleSubmit}
        className="lg:mt-8 w-full py-3 m-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Confirm Selection
      </button>

      {/* Confirmation Info */}
      {selectedDate && selectedTime && topic && (
        <div className="text-center my-6 text-lg font-medium text-gray-300">
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          <p>Selected Time Slot: {selectedTime}</p>
          <p>Topic: {topic}</p>
        </div>
      )}

      {/* Show the Toast component */}
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

export default CalendlyBooking;
