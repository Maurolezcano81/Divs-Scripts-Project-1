import 'dotenv/config';

export const environment = {
  server: {
    node_env: process.env.NODE_ENV === 'production',
    host: process.env.HOST || "127.0.0.1",
    port: parseInt(process.env.PORT || "3000"),
  },

  database: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    cString: process.env.DB_CONNECTION_STRING || "",
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    apiUrl: process.env.AI_ENDPOINT || "https://models.inference.ai.azure.com",
    model: process.env.OPENAI_MODEL || "",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
};
