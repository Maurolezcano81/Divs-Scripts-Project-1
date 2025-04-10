import { expressjwt } from 'express-jwt';
import { environment } from '../config/environment.js';
import User from '../models/user.model.js';

const requireAuth = expressjwt({
  secret: environment.jwt.secret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
});

const loadUser = async (req, res, next) => {
  console.log('Token decodificado:', req.auth);

  try {
    const userId = req.auth?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido: falta ID de usuario' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = {
      id: user.id.toString(),
      name: user.name,
      email: user.email
    };

    console.log('Usuario autenticado:', user.email);
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', details: error.message });
  }
};

const handleJwtError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('Error JWT:', err.message);
    return res.status(401).json({ message: 'Token inválido', details: err.message });
  }
  next(err);
};

export const authMiddleware = [requireAuth, handleJwtError, loadUser];