import mongoose from 'mongoose';
import User from '@/models/User';

const connectMongo = async () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .catch((e) => console.error('Mongoose Client Error: ' + e.message));

export default connectMongo;
