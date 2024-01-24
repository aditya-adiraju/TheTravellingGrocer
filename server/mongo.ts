import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

const connectToMongo = async (): Promise<void> => {
  // https://www.mongodb.com/community/forums/t/typeerror-cannot-read-property-startswith-of-undefined/146999/9
  const uri = process.env['MONGODB_URI'] as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

const disconnectFromMongo = async (): Promise<void> => {
  // https://www.mongodb.com/community/forums/t/typeerror-cannot-read-property-startswith-of-undefined/146999/9
  const uri = process.env['MONGODB_URI'] as string;
  const client = new MongoClient(uri);
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error(error);
  }
};

export default connectToMongo;
