import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import noteRoutes from './src/routes/note.routes.js';
import activityRoutes from './src/routes/activity.routes.js';
import chatRoutes from './src/routes/chat.routes.js';
import { environment } from './src/config/environment.js';
import { connectDB } from './src/config/db.js';

const app = express();
const PORT = environment.server.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'API is working correctly' });
});

await connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/chats', chatRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'An unexpected error occurred'
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
