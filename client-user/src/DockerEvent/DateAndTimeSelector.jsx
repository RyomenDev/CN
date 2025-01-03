import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";

const DateAndTimeSelector = ({
  selectedDate,
  onDateChange,
  availableDates,
  currentDateAvailableSlots,
  selectedTime,
  onTimeChange,
  loading,
  maxDate,
}) => {
  return (
    <div className="flex flex-col justify-center items-center justify w-full p-1 lg:p-4 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-white">
        Select a Date and Time Slot
      </h2>

      {/* Calendar Component */}
      <div className="flex justify-center bg-gray-700 shadow-md rounded-lg p-1 my-3 lg:p-4 lg:m-4 w-full max-w-full">
        <Calendar
          style={{
            padding: "0px",
            margin: "0px",
            width: "100%",
            height: "100%",
          }}
          onChange={onDateChange}
          value={selectedDate}
          minDate={new Date()}
          maxDate={maxDate}
          tileDisabled={({ date }) =>
            !availableDates.some(
              (availableDate) =>
                availableDate.toLocaleDateString() === date.toLocaleDateString()
            )
          }
        />
      </div>

      {/* Time Slot Selection */}
      <div className="w-auto flex justify-center">
        {loading ? (
          <div className="text-gray-300">Loading available slots...</div>
        ) : selectedDate && currentDateAvailableSlots.length > 0 ? (
          <select
            value={selectedTime}
            onChange={onTimeChange}
            className="w-full lg:px-4 py-2 lg:py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4 bg-gray-700 text-white"
          >
            <option value="" disabled>
              Select a Time Slot
            </option>
            {currentDateAvailableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        ) : selectedDate ? (
          <p className="text-red-600">No available slots for this date.</p>
        ) : (
          <p className="text-white bg-red-600 p-2 rounded-md">Select a date</p>
        )}
      </div>
    </div>
  );
};

export default DateAndTimeSelector;
