import mongoose from 'mongoose';

const connectToMongo = async () => mongoose.connect(process.env.MONGODB_URI);

export default connectToMongo;
