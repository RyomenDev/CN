import { useState } from "react";

const InterviewOptions = ({ topic, onTopicChange }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-2 lg:p-6 bg-gray-800 shadow-lg rounded-lg space-y-6 ">
      <h2 className="text-3xl font-semibold text-white">Interview Options</h2>
      <input
        type="text"
        value={topic}
        onChange={onTopicChange}
        placeholder="Enter Topic"
        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white bg-gray-700"
      />
    </div>
  );
};

export default InterviewOptions;
