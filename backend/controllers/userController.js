import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const [users] = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await User.getById(id);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      registration_date: new Date()
    });
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updateData = { name, email, role };
    if (hashedPassword) updateData.password = hashedPassword;
    await User.update(id, updateData);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
