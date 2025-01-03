import { Interview } from "../models/interview.model.js";
import { User } from "../models/user.model.js";

// Helper function to parse date and time to 24-hour format
const parseScheduledDate = (date, time) => {
  const [month, day, year] = date.split("/").map(Number);
  const [timePart, period] = time.split(" ");
  const [hour, minute] = timePart.split(":").map(Number);

  let hour24 = hour;
  if (period.toUpperCase() === "PM" && hour24 !== 12) hour24 += 12;
  if (period.toUpperCase() === "AM" && hour24 === 12) hour24 = 0;

  return new Date(Date.UTC(year, month - 1, day, hour24, minute));
};

// Endpoint for students to schedule an interview
export const InterviewScheduler = async (req, res) => {
  try {
    const { date, time, topic } = req.body.data; // Extract date, time, and topic from request
    // console.log(date, time, topic);

    const studentId = req.user.uid;

    // Find the student by UID
    const student = await User.findOne({ uid: studentId });
    const studentObjId = student._id;

    if (!student || student.userType !== "student") {
      return res.status(400).json({ message: "Invalid student ID or role." });
    }

    // Check if the student already has a scheduled or accepted interview
    const existingInterview = await Interview.findOne({
      student: studentObjId,
      status: { $in: ["Scheduled", "Accepted"] },
    });

    if (existingInterview) {
      //   console.log(
      //     "existingInterview",
      //     existingInterview?.scheduledDate?.toLocaleString()
      //   );
      //   console.log(existingInterview);

      const date = existingInterview?.scheduledDate
        ? new Date(existingInterview.scheduledDate).toISOString().split("T")[0]
        : null;
      const time = existingInterview?.timeSlot;
      console.log(date, time);

      return res.status(400).json({
        message: `You already have an interview scheduled or accepted on ${date} ${time}`,
      });
    }

    // Parse and format the scheduled date and time
    const scheduledDate = parseScheduledDate(date, time);

    // Validate that the scheduled date is in the future
    if (scheduledDate <= Date.now()) {
      return res
        .status(400)
        .json({ message: "Scheduled date must be in the future" });
    }

    // Create a new interview instance
    const interview = new Interview({
      student: studentObjId,
      scheduledDate,
      timeSlot: time, // Use the time slot directly
      status: "Scheduled",
      notes: topic, // Use the topic for notes
    });

    // Save the interview to the database
    await interview.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Interview scheduled successfully.", interview });
  } catch (err) {
    console.error("Error scheduling interview:", err);
    res
      .status(500)
      .json({ message: "Error scheduling interview.", error: err.message });
  }
};

// Controller to fetch all interviews scheduled for a specific user
export const getUserInterviews = async (req, res) => {
  try {
    const studentId = req.user.uid; // Assuming the student ID is passed as part of the request

    // Fetch the user based on the provided student ID
    const student = await User.findOne({ uid: studentId });
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the ObjectId of the student
    const studentObjId = student._id;

    // Fetch all interviews scheduled for the student, populating mentor details if needed
    const interviews = await Interview.find({ student: studentObjId }).populate(
      "mentor"
    );

    // Send the interviews to the client
    return res.status(200).json({ interviews });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch interviews." });
  }
};

// Controller to fetch available time slots for scheduling interviews
export const getAvailableTimeSlots = async (req, res) => {
  try {
    // Define the fixed time slots
    const timeSlots = [
      "9:00 PM - 09:30 PM",
      "09:30 PM - 10:00 PM",
      "10:00 PM - 10:30 PM",
      "10:30 PM - 11:00 PM",
      "11:00 PM - 11:30 PM",
      "11:30 PM - 12:00 PM",
    ];

    // Get the current date and 15 days later
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 15);

    // Fetch interviews within the date range, comparing `scheduledDate` with current date and time slot
    const interviews = await Interview.find({
      scheduledDate: {
        $gte: currentDate, // From today
        $lte: endDate, // To 15 days later
      },
    });

    // Organize scheduled time slots by date
    const scheduledSlots = interviews.reduce((acc, interview) => {
      const interviewDate = interview.scheduledDate.toISOString().split("T")[0];
      if (!acc[interviewDate]) {
        acc[interviewDate] = new Set();
      }
      acc[interviewDate].add(interview.timeSlot);
      return acc;
    }, {});

    // Calculate available time slots for each day
    const availableSlots = {};
    for (let day = 0; day <= 15; day++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + day);
      const dateString = date.toISOString().split("T")[0];

      // Filter out the already scheduled slots for each date
      availableSlots[dateString] = timeSlots.filter(
        (slot) => !scheduledSlots[dateString]?.has(slot)
      );
    }

    // Send the available slots to the client
    res.status(200).json({
      success: true,
      availableSlots,
    });
  } catch (error) {
    console.error("Error fetching available time slots:", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to fetch available time slots. Please try again later.",
    });
  }
};
