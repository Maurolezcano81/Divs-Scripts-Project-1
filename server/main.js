import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
import { environment } from './src/config/environment.js';
import activityRoutes from './src/routes/activity.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import chatRoutes from './src/routes/chat.routes.js';
import dashboardRoutes from './src/routes/dashboard.routes.js';
import emotionRoutes from './src/routes/emotion.routes.js';
import noteRoutes from './src/routes/note.routes.js';
import userRoutes from './src/routes/user.routes.js';
import archetypeRoutes from './src/routes/archetype.routes.js';
import temperamentRoutes from './src/routes/temperament.routes.js';

const app = express();
const PORT = environment.server.port || 3000;

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'La API está funcionando correctamente' });
});

await connectDB()

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/archetypes', archetypeRoutes);
app.use('/api/temperaments', temperamentRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: `Ruta no encontrada: ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Ha ocurrido un error inesperado'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});