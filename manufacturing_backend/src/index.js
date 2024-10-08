// server.js

import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import prisma from '../utils/prismaClient.js';
import {authMiddleware, roleMiddleware} from '../middleware/authMiddleware.js';  // Ensure this path is correct
import { register, login } from './auth/auth.js';
import { createPlant, addEngineerToPlant, addManagerToPlant, getPlantDetails } from './plant/plant.js';
import plantRoutes from './routes/plantRoutes.js';
const app = express();


config();

// Middleware
app.use(cors());
app.use(json());

// Registration route
app.post('/api/register', register);

// Login route
app.post('/api/login', login);


// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send(`Hello, ${req.user.role}`);
});

// plant routes
app.use('/api/plants', plantRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
