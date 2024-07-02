import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'lector',
      registration_date: new Date()
    });
    
    if (result.affectedRows > 0) {
      console.log('Usuario creado:', result);
      res.json({ success: true, message: 'Usuario registrado exitosamente' });
    } else {
      throw new Error('No se pudo crear el usuario');
    }
  } catch (err) {
    console.error('Error detallado:', err);
    res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await User.findByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    const user = users[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });

    res.json({ success: true, token, redirectUrl: user.role === 'lector' ? '/' : user.role === 'bibliotecario' ? '/bibliotecario.html' : '/admin.html' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default { register, login };
