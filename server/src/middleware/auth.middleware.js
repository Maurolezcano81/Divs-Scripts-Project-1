import jwt from 'jsonwebtoken';
import { environment } from '../config/environment.js';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers?.authorization?.split(' ')[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, environment.jwt.secret);

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again.' });
    }

    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};


