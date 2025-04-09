import jwt from 'jsonwebtoken';
import { environment } from '../config/environment.js';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  console.log("Headers completos:", JSON.stringify(req.headers));

  const token = (req.headers.authorization?.split(" ")[1])?.replace(/['"]+/g, "");
  console.log("Token:", token);

    if (!token) {return res.status(401).json({ message: 'No token provided' });}

    try {
      const decoded = jwt.verify(token, environment.jwt.secret);
      console.log('Token decodificado:', decoded);
      if(!decoded.id){ return res.status(401).json({ message: 'Invalid token' })}

      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('Usuario no encontrado con ID:', decoded.id);
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = {
        id: user.id.toString(),
        name: user.name,
        email: user.email
      };

      console.log('Usuario autenticado:', user.email);

      next();
    } catch (err) {
      console.error('Error al verificar token:', err.message);
      return res.status(401).json({ message: 'Invalid token', details: err.message });
    }
};