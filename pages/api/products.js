// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../lib/db';
import Product from '../lib/models/products';

export default async (req, res) => {
  await connectDB();
  const products = await Product.find({});
  res.status(200).json(products);
};