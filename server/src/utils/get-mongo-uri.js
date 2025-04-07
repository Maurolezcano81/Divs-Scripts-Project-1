import { environment } from "../config/environment.js";

export const getMongoUri = () => {
  const username = environment.database.username
  const password = environment.database.password
  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);

  return `mongodb+srv://${encodedUsername}:${encodedPassword}@cluster0.63252sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
};
