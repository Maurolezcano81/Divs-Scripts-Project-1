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
        .json({ message: "El correo electrónico y la contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);
    console.log('Inicio de sesión exitoso para el usuario:', email);
    console.log('Token generado con ID:', user.id.toString());


    res.status(200).json({
      user: formatUserResponse(user),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', details: error.message });
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
      location
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'El nombre, correo electrónico y contraseña son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (name.trim() === '') {
      return res.status(400).json({ message: 'El nombre no puede estar vacío' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico' });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      birthDate: birthDate || undefined,
      gender: gender || undefined,
      nationality: nationality || undefined,
      location: location || undefined
    });

    res.status(201).json({
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', details: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', details: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      birthDate,
      gender,
      nationality,
      location
    } = req.body;

    if (name !== undefined && name.trim() === '') {
      return res.status(400).json({ message: 'El nombre no puede estar vacío' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        birthDate,
        gender,
        nationality,
        location
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', details: error.message });
  }
};