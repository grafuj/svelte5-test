import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Film } from './entities/Film';
import { Review } from './entities/Review';

export const AppDataSource = new DataSource({
  type: 'postgres', // Change to your database type
  host: process.env.DB_HOST, // Database host
  port: Number(process.env.DB_PORT), // Database port
  username: process.env.DB_USER, // Database username
  password: process.env.DB_PASS, // Database password
  database: process.env.DB_NAME, // Database name
  synchronize: true, // Automatically sync schema (only for development!)
  logging: true, // Enable logging
  entities: [User, Film, Review], // Add all your entities here
  migrations: [], // Add migrations if you have them
  subscribers: [], // Add subscribers if you have them
});
