import mongoose from 'mongoose';

const users = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const User = mongoose.models?.User || mongoose.model('User', users);

export default User;