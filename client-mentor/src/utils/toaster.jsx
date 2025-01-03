import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type = "default", setToastMessage }) => {
  console.log(message, type);

  // Function to show the toast notification based on type
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warn(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  // Trigger toast on component mount or when message/type changes
  useEffect(() => {
    if (message) {
      showToast();

      // Reset the message after the toast is shown
      const timeout = setTimeout(() => {
        setToastMessage(""); // Clear the message state after toast is shown
      }, 3000); // Default duration for react-toastify

      return () => clearTimeout(timeout); // Clean up timeout on component unmount
    }
  }, [message, type, setToastMessage]);

  return <ToastContainer />;
};

export default Toast;
