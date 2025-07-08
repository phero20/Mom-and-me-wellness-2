import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
  // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.JWT_SECRET,
      );

    res.json({
      success: true,
      message: "User registered successfully",
      token
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body; // fixed typo: passowrd -> password
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'User does not exist. Please signup.',
      });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid password',
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
    );
    res.json({
      success: true,
      message: "User signIn successfully",
      name:user.name,
      token
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const id = req.id;
    // Find and update the user with the fields provided in req.body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true, select: '-password' } // Exclude password from result
    );
    if (!updatedUser) {
      return res.json({
        success: false,
        message: 'User does not exist',
      });
    }
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}




export const getProfileData = async (req,res) => {
  try {
    const id = req.id;
    const user = await User.findById(id).select('-password');
    if(!user){
      return res.json({
        success: false,
        message: 'User does not exist',
      });
    }
    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}