import connectDB from '../../lib/db';
import User from '../../lib/models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await connectDB();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'No user found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ token });
};