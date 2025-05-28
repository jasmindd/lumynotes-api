
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe.' });

    const hashedPassword = await bcrypt.hash(password, 10); // ¡No olvides encriptar!
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario.', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, profilePic } = req.body;

  if (req.userId !== id) {
    return res.status(403).json({ message: 'No autorizado para actualizar este perfil' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { name, profilePic }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil.', error });
  }
};
exports.getProfile = async (req, res) => {
  try {
    // El middleware auth debería poner el id en req.userId, o similar
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};
