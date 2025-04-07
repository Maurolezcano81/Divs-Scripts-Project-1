import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './src/routes/user.routes.js';
import { environment } from './src/config/environment.js';

const app = express();
const PORT = environment.server.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'API is working correctly' });
});

app.use('/api/users', userRoutes);

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
