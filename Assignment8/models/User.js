import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  imagePath: { type: String }, // e.g., /images/xxx.jpg
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

// DO NOT add schema.index({...}) here; 'unique: true' on email is enough.

export const User = mongoose.model('User', userSchema);
