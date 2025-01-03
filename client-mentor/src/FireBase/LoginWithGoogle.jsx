// LoginWithGoogle.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./Login";
import { useDispatch } from "react-redux";

const LoginWithGoogle = ({ role, setErrorMessage }) => {
  const userRole = role;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      //   console.log(result);

      const user = result.user;

      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        return;
      }
      //   const user = userCredential.user;
      const firebase_Token = await user.getIdToken();
      //   console.log(firebase_Token);

      loginUser(firebase_Token, dispatch, navigate, setErrorMessage, userRole);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login with Google"}
    </button>
  );
};

export default LoginWithGoogle;
