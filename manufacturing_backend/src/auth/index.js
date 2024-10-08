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

const register = async (email, password) => {
  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'OWNER', // Default role for registered user
      },
    });
    return generateToken(user);
  } catch (error) {
    // Handle potential errors, e.g., duplicate email
    throw new Error('Registration failed. Please try again.');
  }
};

const login = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await compare(password, user.password))) {
      return generateToken(user);
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    // Handle other errors (e.g., database issues)
    throw new Error('Login failed. Please try again.');
  }
};

export  { register, login };
