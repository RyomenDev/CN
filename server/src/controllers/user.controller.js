import { User } from "../models/user.model.js";

// Function to filter the user data to only include specific fields
const filterUserData = (user) => {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    address: user.address,
    phone: user.phone,
    picture: user.picture,
    premiumMember: user.premiumMember,
  };
};

// Common error handler function
const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({ message: "Internal Server Error" });
};

const UserViewProfileController = async (req, res) => {
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter user data before sending it in the response
    const filteredUser = filterUserData(user);
    res.status(200).json({
      message: "User profile fetched successfully",
      user: filteredUser,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const UserUpdateProfileController = async (req, res) => {
  const userId = req.user.uid;
  const updatedData = req.body;

  try {
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allowedUpdates = [
      "name",
      "age",
      "gender",
      "address",
      "phone",
      "picture",
    ];

    allowedUpdates.forEach((field) => {
      if (updatedData[field] !== undefined) {
        user[field] = updatedData[field];
      }
    });

    await user.save();

    // Filter user data before sending it in the response
    const filteredUser = filterUserData(user);
    res.status(200).json({
      message: "User profile updated successfully",
      user: filteredUser,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { UserViewProfileController, UserUpdateProfileController };

// // patch (not put)
// const UserUpdateProfileCOntroller = async (userId) => {
//   console.log("User profile update requested for:", req.user.uid);

//   const userId = req.user.uid;
//   const updatedData = req.body; // The updated data sent from the frontend

//   try {
//     // Find the user in the database
//     let user = await User.findOne({ uid: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user profile data (excluding email)
//     user.name = updatedData.name || user.name;
//     user.picture = updatedData.picture || user.picture;
//     user.age = updatedData.age || user.age;
//     user.gender = updatedData.gender || user.gender;
//     user.address = updatedData.address || user.address;
//     user.phone = updatedData.phone || user.phone;

//     // Save the updated user data
//     await user.save();

//     res
//       .status(200)
//       .json({ message: "User profile updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
