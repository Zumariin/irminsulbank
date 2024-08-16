const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const loginController = async (req, res) => {
  const { username, password } = req.body;

  console.log(username)
  console.log(password)

  const { error } = loginSchema.validate({ username, password });
  if (error) {
    return res.status(400).json({ message: 'Input tidak valid', details: error.details });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { username : username },
    });

    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const isPasswordValid = password == user.password

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', 
    });

    return res.json({ message: 'Login berhasil', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

const whoAmIController = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: false }); 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: false });
    }

    return res.json({ message: true, user }); 
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ message: false }); 
  }
};

module.exports = { whoAmIController, loginController };