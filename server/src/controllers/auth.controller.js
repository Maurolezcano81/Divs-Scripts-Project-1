import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { environment } from "../config/environment.js";

const formatUserResponse = (user) => ({
  id: user.id.toString(),
  name: user.name,
  email: user.email,
});

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id.toString(), email: user.email },
    environment.jwt.secret,
    { expiresIn: environment.jwt.expiresIn }
  );
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    console.log('Login successful for user:', email);
    console.log('Token generated with ID:', user.id.toString());


    res.status(200).json({
      user: formatUserResponse(user),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      birthDate,
      gender,
      nationality,
      ethnicity,
      location
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      birthDate: birthDate || undefined,
      gender: gender || undefined,
      nationality: nationality || undefined,
      ethnicity: ethnicity || undefined,
      location: location || undefined
    });

    res.status(201).json({
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', details: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      birthDate,
      gender,
      nationality,
      ethnicity,
      location
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        birthDate,
        gender,
        nationality,
        ethnicity,
        location
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};