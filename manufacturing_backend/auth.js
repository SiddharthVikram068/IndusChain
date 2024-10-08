// auth.js

import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { user as _user } from '@prisma/client'; // Create this file to export Prisma Client instance

const generateToken = (user) => {
  return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const register = async (email, password) => {
  const hashedPassword = await hash(password, 10);
  const user = await _user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'OWNER', // Default role for registered user
    },
  });
  return generateToken(user);
};

const login = async (email, password) => {
  const user = await _user.findUnique({ where: { email } });
  if (user && (await compare(password, user.password))) {
    return generateToken(user);
  }
  throw new Error('Invalid credentials');
};

export default { register, login };
