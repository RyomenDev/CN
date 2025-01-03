import { useState } from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithEmailPassword from "./LoginWithEmailPassword";

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track if the user is in sign-up mode

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Login"} as Mentor
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Email and Password Login/Sign Up */}
        <div className="space-y-4">
          <LoginWithEmailPassword
            role="mentor"
            setErrorMessage={setErrorMessage}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />

          {/* Google Login */}
          <LoginWithGoogle role="mentor" setErrorMessage={setErrorMessage} />
        </div>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
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
