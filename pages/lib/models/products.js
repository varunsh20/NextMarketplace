import mongoose from 'mongoose';

const products = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.models?.Product || mongoose.model('Product', products);

export default Product;