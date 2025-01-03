import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const interviewSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    scheduledDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Scheduled date must be in the future",
      },
    },

    timeSlot: {
      type: String,
      required: true,
      enum: [
        "9:00 PM - 09:30 PM",
        "09:30 PM - 10:00 PM",
        "10:00 PM - 10:30 PM",
        "10:30 PM - 11:00 PM",
        "11:00 PM - 11:30 PM",
        "11:30 PM - 12:00 PM",
      ],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "Accepted"],
      default: "Accepted",
    },
    feedback: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying by student, mentor, and date
interviewSchema.index({ student: 1, mentor: 1, scheduledDate: 1, timeSlot: 1 });

export const Interview = mongoose.model("Interview", interviewSchema);

// import mongoose, { Schema } from "mongoose";
// import { User } from "./user.model.js";

// const interviewSchema = new Schema(
//   {
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     mentor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: false,
//     },
//     scheduledDate: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Scheduled", "Completed", "Cancelled", "Accepted"],
//       default: "Scheduled",
//     },
//     feedback: {
//       type: String,
//       required: false,
//     },
//     notes: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Index for faster querying by student and mentor
// interviewSchema.index({ student: 1, mentor: 1, scheduledDate: 1 });

// export const Interview = mongoose.model("Interview", interviewSchema);
