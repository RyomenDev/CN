import admin from "firebase-admin";

// Initialize Firebase Admin SDK with credentials if necessary
const serviceAccount = {
  type: "service_account",
  project_id: String(import.meta.env.FIREBASE_PROJECT_ID),
  private_key_id: String(import.meta.env.FIREBASE_PRIVATE_KEY_ID),
  private_key: String(import.meta.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, "\n"),
  client_email: String(import.meta.env.FIREBASE_CLIENT_EMAIL),
  client_id: String(import.meta.env.FIREBASE_CLIENT_ID),
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: String(import.meta.env.FIREBASE_CLIENT_CERT_URL),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com",
});

// Function to set a custom role claim
export const setRole = async (userId, role) => {
  if (!userId || !role) {
    throw new Error("User ID and role must be provided");
  }

  try {
    // Set the custom claim 'role' for the user
    await admin.auth().setCustomUserClaims(userId, { role: role });
    console.log(`Role ${role} successfully set for user ${userId}`);
    return { success: true, message: `Role ${role} set for user ${userId}` };
  } catch (error) {
    console.error("Error setting custom claim:", error);
    throw new Error(`Error setting custom claim: ${error.message}`);
  }
};

// Example usage
// setRole("userUid123", "mentor");
