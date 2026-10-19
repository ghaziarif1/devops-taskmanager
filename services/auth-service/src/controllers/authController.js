const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ error: 'Cet email est déjà utilisé.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Identifiants invalides.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Identifiants invalides.' });

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Connexion réussie.',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};

exports.health = (req, res) => {
  res.status(200).json({ status: 'OK', service: 'auth-service' });
};