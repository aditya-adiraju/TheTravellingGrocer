import { MongoClient, ObjectId} from 'mongodb';
import Item from '../models/item';

const uri = process.env['MONGODB_URI'] as string;
const db_name = "grocery_store";

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
      setTimeout(() => {client.close()}, 15)
    }
  };
  const result = await insert(name, description, price, polygon);
  return result;
};

export const deleteItemFromDb = async (polygonName: string) => {
  const deleteItem = async (polygonName: string) => {
    try {
      await client.connect();
      const database = client.db("grocery_store");
      const items = database.collection('items');

      const query0 = { polygonName: polygonName };
      const result0 = await items.findOne(query0);
      if (result0 === null) { 
        console.log(`No item found with that polygonName ${polygonName}`);
        return;
      }

      const id = result0._id;
      const query = { _id: new ObjectId(id) };

      const result = await items.deleteOne(query);
      console.log(`${result.deletedCount} document(s) deleted`);
      return result;
    } finally {
      setTimeout(() => {client.close()}, 1500)
    }
  };
  const result = await deleteItem(polygonName);
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
      const result = items.find(query, options).toArray();
      console.log(result);
      return result;
      
    }   finally {
      setTimeout(() => {client.close()}, 1500)
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
      
      setTimeout(() => {client.close()}, 1500)
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
