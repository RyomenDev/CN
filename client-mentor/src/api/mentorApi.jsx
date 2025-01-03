import axios from "axios";
import conf from "../conf/conf.jsx";
import { handleApiError } from "../utils/handleInterviewApiError.jsx";
import { getHeaders } from "../utils/authUtils";
import { refreshToken } from "../FireBase/RefreshIdToken";

// Constants for API URL
const SERVER_API_URL = conf.SERVER_API_URL;
const INTERVIEW_URL = `${SERVER_API_URL}/mentor`;

// Utility function to handle retry logic with token refresh
// Utility function to handle retry logic with token refresh
const retryRequest = async (requestFunction, headers, maxRetries = 3) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await requestFunction();
    } catch (error) {
      // Check if error explicitly states "unAuthorized Not a mentor"
      if (error.response?.data?.message === "unAuthorized Not a mentor") {
        console.error("Authorization error: Not a mentor.");
        throw new Error("Authorization failed: Not a mentor.");
      }

      if (error.response?.status === 401 && attempt < maxRetries - 1) {
        console.warn(
          `Token expired or error occurred. Retrying... Attempt ${attempt + 1}`
        );
        attempt++;

        // Refresh the token
        const newToken = await refreshToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          throw new Error("Failed to refresh token.");
        }
      } else {
        throw error; // If we have exceeded max retries or the error is not 401
      }
    }
  }

  throw new Error("Request failed after multiple attempts");
};

const getAllInterviews = async (setToastMessage, setToastType) => {
  try {
    const headers = await getHeaders();

    // Request function for fetching all interviews
    const requestFunction = async () => {
      console.log("sending");

      const response = await axios.get(`${INTERVIEW_URL}/getAllInterviews`, {
        headers,
      });
      //   console.log(response);
      return response.data;
    };

    const result = await retryRequest(requestFunction, headers);

    // Set success message in Toast after successful fetch
    setToastMessage("Interviews fetched successfully!");
    setToastType("success");

    return result;
  } catch (error) {
    // const errorMessage = error.message || "An unknown error occurred";
    handleApiError(error, setToastMessage, setToastType);
    if (error.message && error.message.includes("Not a mentor"))
      throw new Error("Authorization failed: Not a mentor.");
    else throw new Error("Failed to fetch scheduled interviews.");
  }
};

const changeInterviewStatus = async (interviewId, newStatus) => {
  try {
    const headers = await getHeaders();

    // Request function for changing interview status
    const requestFunction = async () => {
      const response = await axios.patch(
        `${INTERVIEW_URL}/interview-statusChange`,
        { status: newStatus, interviewId },
        { headers }
      );
      return response.data;
    };

    return await retryRequest(requestFunction, headers);
  } catch (error) {
    handleApiError(error, "Error changing interview status");
    throw new Error("Failed to change interview status.");
  }
};

export { getAllInterviews, changeInterviewStatus };
