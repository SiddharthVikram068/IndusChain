// auth.js

import jwt from 'jsonwebtoken'; // Import jsonwebtoken as a default
import bcrypt from 'bcryptjs';   // Import bcrypt as a default
import prisma from '../../utils/prismaClient.js'; // Ensure prismaClient is properly set up

const { sign } = jwt; // Destructure sign from jwt
const { hash, compare } = bcrypt; // Destructure hash and compare from bcrypt

const generateToken = (user) => {
  return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const register = async (req, res) => {

  const { email, password, role } = req.body;

  // Check if the role is valid
  if (!['OWNER', 'MANAGER', 'ENGINEER'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }


  try {

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    const token = generateToken(user);
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    // Handle potential errors, e.g., duplicate email
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    // Handle other errors (e.g., database issues)
    res.status(500).json({ error: error.message });
  }
};

export  { register, login };
