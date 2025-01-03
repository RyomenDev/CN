export const handleApiError = (error, setToastMessage, setToastType) => {
  let errorMessage = "An unexpected error occurred.";
  let errorType = "error";
  // Handle different error scenarios
  if (error.response) {
    if (error.response.status === 401) {
      if (error.message && error.message.includes("Not a mentor")) {
        errorMessage = "Authorization failed: Not a mentor.";
      } else errorMessage = "Unauthorized access. Please login again.";
    } else if (error.response.status === 400) {
      // console.log(error.response.data.message);
      errorMessage = "Bad request. Please check your input.";
    } else if (error.response.status === 500) {
      errorMessage = "Server error. Please try again later.";
    } else {
      errorMessage = error.response.data?.message || "Something went wrong.";
    }
  } else if (error.request) {
    errorMessage = "No response from server. Please check your connection.";
  } else {
    errorMessage = error.message || "Unknown error occurred.";
  }
  // Update the toast state in the parent component
  setToastMessage(errorMessage);
  setToastType(errorType);
};
