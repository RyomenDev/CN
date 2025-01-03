import { Interview } from "../models/interview.model.js";
import { User } from "../models/user.model.js";
// Endpoint to fetch all interviews

export const getAllInterviews = async (req, res) => {
  try {
    // Fetch the userId from the request
    const userId = req.user.uid;

    // Find the user by UID
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is a mentor
    if (user.userType !== "mentor") {
      return res.status(401).json({
        success: false,
        message: "unAuthorized Not a mentor",
      });
    }

    // Fetch all interviews and populate student details
    const interviews = await Interview.find().populate("student", "email name");

    // Send the interviews back to the client
    return res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error.message);

    // Send an error response
    return res.status(500).json({
      success: false,
      message: "Unable to fetch interviews. Please try again later.",
    });
  }
};

// PATCH route for changing interview status
// app.patch("/api/interviews/:id/status", async (req, res) => {
export const changeInterviewStatus = async (req, res) => {
  //   console.log(req.body);
  try {
    const { status, interviewId } = req.body;
    // Find the interview by ID and update its status
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      { status },
      { new: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json(updatedInterview);
  } catch (error) {
    console.error("Error updating interview status", error);
    res.status(500).json({ message: "Server error" });
  }
};
