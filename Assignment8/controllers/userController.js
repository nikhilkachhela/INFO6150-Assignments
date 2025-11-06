import bcrypt from 'bcryptjs';
import Joi from 'joi';
import { User } from '../models/User.js';

// Validation schemas
const nameRegex = /^[A-Za-z ]+$/; // alphabetic + spaces
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const createSchema = Joi.object({
  fullName: Joi.string().pattern(nameRegex).min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required()
});

const editSchema = Joi.object({
  email: Joi.string().email().required(), // identify user (email cannot change)
  fullName: Joi.string().pattern(nameRegex).min(2).max(60),
  password: Joi.string().pattern(passwordRegex)
}).or('fullName', 'password'); // must change at least one

// 1) POST /user/create
export async function createUser(req, res, next) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.' });

    const exists = await User.findOne({ email: value.email });
    if (exists) return res.status(400).json({ error: 'Validation failed.' }); // duplicate email

    const hash = await bcrypt.hash(value.password, 10);
    await User.create({ fullName: value.fullName, email: value.email, passwordHash: hash });

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (e) { next(e); }
}

// 2) PUT /user/edit
export async function editUser(req, res, next) {
  try {
    const { error, value } = editSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.' });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (value.fullName) user.fullName = value.fullName;
    if (value.password) user.passwordHash = await bcrypt.hash(value.password, 10);

    await user.save();
    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (e) { next(e); }
}

// 3) DELETE /user/delete (by email)
export async function deleteUser(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Validation failed.' });

    const deleted = await User.findOneAndDelete({ email });
    if (!deleted) return res.status(404).json({ error: 'User not found.' });

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (e) { next(e); }
}

// 4) GET /user/getAll
export async function getAllUsers(req, res, next) {
  try {
    const docs = await User.find().select('fullName email passwordHash');
    const users = docs.map(d => ({
      fullName: d.fullName,
      email: d.email,
      password: d.passwordHash // rubric asks to include hashed password
    }));
    return res.status(200).json({ users });
  } catch (e) { next(e); }
}

// 5) POST /user/uploadImage
// Body: form-data -> email (text), image (file)
export async function uploadImage(req, res, next) {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ error: 'Validation failed.' });
    if (!req.file) return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.imagePath) {
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    // Save path
    const relPath = `/images/${req.file.filename}`;
    user.imagePath = relPath;
    await user.save();

    return res.status(201).json({ message: 'Image uploaded successfully.', filePath: relPath });
  } catch (e) {
    // If multer threw format error, convert message to rubric wording
    if (e.message && e.message.startsWith('Invalid file format')) {
      return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });
    }
    next(e);
  }
}
