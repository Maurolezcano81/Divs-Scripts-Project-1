import mongoose from 'mongoose';
import { getMongoUri } from '../utils/get-mongo-uri.js';
import { environment } from './environment.js';

export const connectDB = async () => {
  try {
    let connectionString = environment.database.cString;

    if (!connectionString && environment.database.username && environment.database.password) {
      connectionString = getMongoUri();
    }
    if (!connectionString) {
      throw new Error('Database connection string is required');
    }

    const connection = await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

