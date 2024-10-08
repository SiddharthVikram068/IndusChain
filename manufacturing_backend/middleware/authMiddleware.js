// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const { verify } = jwt;

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const user = await verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach user info to the request object
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

// makes sure no one except a certain role can go through this middleware
export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

export default { authMiddleware, roleMiddleware };
