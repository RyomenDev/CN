import { useState } from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithEmailPassword from "./LoginWithEmailPassword";

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track login or sign-up mode

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white">
          {isSignUp ? "Sign Up" : "Login"} as Student
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}

        {/* Login or Sign Up Options */}
        <div className="space-y-4">
          <LoginWithEmailPassword
            role="student"
            setErrorMessage={setErrorMessage}
            isSignUp={isSignUp} // Pass sign-up mode to the child component
            setIsSignUp={setIsSignUp} // Allow child component to toggle sign-up state
          />
          <LoginWithGoogle role="student" setErrorMessage={setErrorMessage} />
        </div>

        {/* Toggle Between Login and Sign Up */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)} // Toggle sign-up state
            className="text-blue-400 hover:text-blue-500 underline"
          >
            {isSignUp
              ? "Already have an account? Login here"
              : "Don't have an account? Sign up here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
