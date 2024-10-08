// server.js

import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authMiddleware from './middleware/authMiddleware.js';  // Ensure this path is correct
import { register, login } from './auth.js';
import { createPlant } from './plant.js';
const app = express();
const prisma = new PrismaClient();

config();

// Middleware
app.use(cors());
app.use(json());

// Registration route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await register(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Create plant route
app.post('/api/plants', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const plant = await createPlant(name, req.user.id);
    res.json(plant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send(`Hello, ${req.user.role}`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
