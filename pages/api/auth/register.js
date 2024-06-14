import connectDB from '../../lib/db';
import User from '../../lib/models/users';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

export default async (req,res) => {
  await connectDB();
  const { name, phone, address, email, password } = req.body;
  console.log(name, phone, address, email, password)
  if (!name || !phone  || !address || !email || !password) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  console.log(name, phone, address, email, password)
  const user = await User.findOne({ email });
  if (user) {
    toast.error('User already exists');
    return res.status(422).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ name, phone, address, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.status(200).json({ token });
};