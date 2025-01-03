import { getAuth } from "firebase/auth";

const auth = getAuth();

export const refreshToken = async () => {
  try {
    const user = auth.currentUser;
    // console.log(user);
    
    if (user) {
      // Refresh the ID token
      const idToken = await user.getIdToken(true); // `true` forces a refresh
      localStorage.setItem("firebase_token", idToken);
      sessionStorage.setItem("firebase_token", idToken);

      return idToken;
      //   console.log("Refreshed ID Token:", idToken);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
