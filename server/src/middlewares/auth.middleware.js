import admin from "../conf/firebase-admin-config.js";

// Middleware to verify Firebase ID Token
export async function verifyToken(req, res, next) {
  //   console.log("req.headers", req.headers);

  const idToken = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!idToken) {
    console.error("Unauthorized: No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token to the request for further use
    // console.log("Token verified, user authenticated:", decodedToken.uid);
    next();
  } catch (error) {
    // Handle token expiration error
    if (error.code === "auth/id-token-expired") {
      //   console.error("Token expired. Please refresh the token and try again.");
      return res
        .status(401)
        .json({ message: "Token expired. Please refresh the token." });
    }

    // Handle any other errors (invalid token, etc.)
    // console.error("Unauthorized: Invalid token", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
