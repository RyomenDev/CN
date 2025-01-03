import { User } from "../models/user.model.js";

const filterUserData = (user) => ({
  name: user.name,
  email: user.email,
  age: user.age,
  gender: user.gender,
  address: user.address,
  phone: user.phone,
  picture: user.picture,
});

export const loginUser = async (req, res) => {
  // console.log(req.user);
  // console.log(req.body); // userRole

  try {
    const { uid, name, email, picture, email_verified } = req.user;
    const { userRole } = req.body;

    if (!email_verified) {
      return res.status(400).json({ message: "Email is not verified." });
    }

    // Log incoming user details for debugging purposes
    // console.log("Authenticated user:", {
    //   uid,
    //   name,
    //   email,
    //   picture,
    //   email_verified,
    // });

    // Check if the user exists in the database
    let user = await User.findOne({ uid });

    // If user does not exist and userRole is "student", create a new user
    if (!user && userRole === "student") {
      user = new User({ uid, name, email, picture, userType: "student" });
      await user.save();
      //   console.log("New student user created:", user);
      return res.status(201).json({
        message: "User created successfully.",
        user: filterUserData(user),
      });
    }

    // If the user already exists, log them in
    if (user) {
      //   console.log("Existing user logged in:", user);
      return res.status(200).json({
        message: "User logged in successfully.",
        user: filterUserData(user),
      });
    }

    // If the userRole is not "student", don't create the user and send an error
    return res.status(400).json({
      message: "User role must be 'student' to create a new account.",
    });
  } catch (error) {
    console.error("Error during user login:", error);

    // Send a detailed error response
    return res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

export { filterUserData };
