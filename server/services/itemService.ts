import { MongoClient, ObjectId} from 'mongodb';
import Item from '../models/item';

const uri = process.env['MONGODB_URI'] as string;
const db_name = process.env['DB_NAME'] as string;

const client = new MongoClient(uri);

export const addItemToDb = async (
  name: string,
  description: string,
  price: number,
  polygon: string
) => {
  const insert = async (
    name: string,
    description: string,
    price: number,
    polygon: string
  ) => {
    try {
      await client.connect();
      const database = client.db(db_name);
      const items = database.collection('items');
      const doc = {
        name: name,
        description: description,
        price: price,
        polygonName: polygon,
      };
      const result = await items.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      return result;
    } finally {
      await client.close();
    }
  };
  const result = await insert(name, description, price, polygon);
  return result;
};

export const deleteItemFromDb = async (id: string) => {
  const deleteItem = async (id: string) => {
    try {
      await client.connect();
      const database = client.db(db_name);
      const items = database.collection('items');

      const query = { _id: new ObjectId(id) };

      const result = await items.deleteOne(query);
      console.log(`${result.deletedCount} document(s) deleted`);
      return result;
    } finally {
      await client.close();
    }
  };
  const result = await deleteItem(id);
  return result;
};

export const getAllItemsFromDb = async () => {
  const getAll = async () => {
    try {
      await client.connect();
      const database = client.db(db_name);
      const items = database.collection('items');

      const query = {};
      const options = {
        projection: {
          _id: 0,
          name: 1,
          description: 1,
          price: 1,
          polygonName: 1,
        },
      };
      const cursor = items.find(query, options);
      const result = cursor.toArray();
      return result;
    } finally {
      await client.close();
    }
  };
  const result = await getAll();
  return result;
};

export const getAllFilteredItemsFromDb = async (query: string)   => {
  const getAll = async (query: string) => {
    try {
      await client.connect();
      const database = client.db(db_name);
      const items = database.collection('items');

      const pipeline = [
        {
          $search: {
            index: "name_index",
            text: {
              query: query, 
              path: "name",
              fuzzy: {}
            }
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            "_id": 0,
            "name": 1,
            "description": 1,
            "price": 1,
            "polygonName": 1,
          }
        }
      ]
      const cursor = items.aggregate(pipeline);
      const result = cursor.toArray();
      return result;
    } finally {
      await client.close();
    }
  };
  const result = await getAll(query);
  return result;
}


module.exports = {
  addItemToDb,
  deleteItemFromDb,
  getAllItemsFromDb,
  getAllFilteredItemsFromDb
};
