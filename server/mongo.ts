
import { MongoClient, ServerApiVersion} from 'mongodb';

const uri = process.env['MONGODB_URI'] as string;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const connectToMongo = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

const disconnectFromMongo = async (): Promise<void> => {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error(error);
  }
}


export { connectToMongo, disconnectFromMongo };
