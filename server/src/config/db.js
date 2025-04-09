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
      throw new Error('La cadena de conexión a la base de datos es obligatoria');
    }

    const connection = await mongoose.connect(connectionString);

    console.log('MongoDB conectado exitosamente');
    return connection;
  } catch (error) {
    console.error('Error de conexión MongoDB:', error.message);
    process.exit(1);
  }
};

