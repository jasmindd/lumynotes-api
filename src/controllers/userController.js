const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe.' });

    const hashedPassword = await bcrypt.hash(password, 10);
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
  
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión.', error });
    }
  };

  exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, profilePic } = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, { name, profilePic }, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar perfil.', error });
    }
  };