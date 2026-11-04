const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const User = require('../models/User');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Das Passwort muss mindestens 6 Zeichen lang sein.' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Bitte gib eine gueltige E-Mail-Adresse ein.' });
    }

    const existing = User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Diese E-Mail-Adresse wird bereits verwendet.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: randomUUID(),
      name: name.trim(),
      email: email.trim(),
      passwordHash,
      createdAt: new Date().toISOString()
    };
    User.create(newUser);

    const token = generateToken(newUser.id);
    res.status(201).json({ token, user: publicUser(newUser) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registrierung fehlgeschlagen.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich.' });
    }

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'E-Mail oder Passwort ist falsch.' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'E-Mail oder Passwort ist falsch.' });
    }

    const token = generateToken(user.id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login fehlgeschlagen.' });
  }
};

exports.getMe = (req, res) => {
  const user = User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
  }
  res.json({ user: publicUser(user) });
};
