import axios from "axios";
import conf from "../conf/conf.jsx";
import { handleApiError } from "../utils/handleAuthApiError";
import { getHeaders } from "../utils/authUtils";
import { refreshToken } from "../FireBase/RefreshIdToken";

// Server base URL
const SERVER_API_URL = conf.SERVER_API_URL;
const FIREBASE_API_URL = `${SERVER_API_URL}/auth`;

// Function to send Firebase token for login
export const loginWithFirebaseToken = async (
  firebaseToken,
  navigate,
  userRole
) => {
  let attempt = 0;
  const maxRetries = 3;

  const headers = await getHeaders();

  const sendLoginRequest = async () => {
    try {
      const response = await axios.post(
        `${FIREBASE_API_URL}/login-with-firebase`,
        { userRole },
        {
          headers,
        }
      );
      //   console.log("logged in", response);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 && attempt < maxRetries) {
        console.log(`Token expired. Retrying... Attempt ${attempt + 1}`);
        attempt += 1;
        const newToken = await refreshToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`; // Update the Authorization header
          return sendLoginRequest(); // Retry the login request
        }
      }
      handleApiError(error, navigate);
      // throw error;
    }
  };

  return sendLoginRequest(); // Initial request attempt
};

// Function for traditional login
// export const LoginUser = async (navigate) => {
//   try {
//     const headers = await getHeaders();
//     const response = await axios.post(
//       `${API_URL}/login`,
//       {},
//       {
//         headers,
//       }
//     );
//     return response.data; // Return the response data
//   } catch (error) {
//     handleApiError(error, navigate); // Handle any API errors
//   }
// };
