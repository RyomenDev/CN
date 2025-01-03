import axios from "axios";
import conf from "../conf/conf.jsx";
import { handleApiError } from "../utils/handleInterviewApiError.jsx";
import { getHeaders } from "../utils/authUtils";
import { refreshToken } from "../FireBase/RefreshIdToken";

// Constants for API URL
const SERVER_API_URL = conf.SERVER_API_URL;
const INTERVIEW_URL = `${SERVER_API_URL}/student`;

// Utility function to handle retry logic with token refresh
const retryRequest = async (requestFunction, headers, maxRetries = 3) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await requestFunction();
    } catch (error) {
      if (error.response?.status === 401 && attempt < maxRetries) {
        // console.log(
        //   `Token expired or error occurred. Retrying... Attempt ${attempt + 1}`
        // );
        attempt++;

        const newToken = await refreshToken();
        // console.log(newToken);

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          throw new Error("Failed to refresh token.");
        }
      } else {
        throw error; // If we have exceeded max retries or error is not 401
      }
    }
  }
  throw new Error("Failed after multiple attempts");
};

// Function to fetch available time slots for interview
const getAvailableTimeSlots = async () => {
  try {
    let headers = await getHeaders();
    const response = await retryRequest(
      () => axios.get(`${INTERVIEW_URL}/getAvailableTimeSlots`, { headers }),
      headers
    );
    // console.log("Available time slots:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch available time slots.");
  }
};

// Function to schedule an interview
const scheduleInterview = async (
  data,
  navigate,
  setToastMessage,
  setToastType
) => {
  //   console.log(data);

  let headers = await getHeaders();

  // Request function to send the interview schedule
  const sendRequest = async () => {
    const response = await axios.post(
      `${INTERVIEW_URL}/interview-schedule`,
      { data },
      { headers }
    );
    return response.data;
  };

  try {
    const responseData = await retryRequest(sendRequest, headers);
    return responseData;
  } catch (error) {
    handleApiError(error, setToastMessage, setToastType);
    throw new Error("Error scheduling interview.");
  }
};

// Function to fetch all scheduled interviews for a user
const getUserInterviews = async () => {
  let headers = await getHeaders();

  // Request function to send the get interviews request
  const sendRequest = async () => {
    const response = await axios.get(`${INTERVIEW_URL}/user-interviews`, {
      headers,
    });
    return response.data;
  };

  try {
    const responseData = await retryRequest(sendRequest, headers);
    return responseData;
  } catch (error) {
    handleApiError(error);
    throw new Error("Error fetching interviews.");
  }
};

export { getAvailableTimeSlots, scheduleInterview, getUserInterviews };
