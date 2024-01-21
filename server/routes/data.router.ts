const express = require('express');
const dataRouter = express.Router();
import { Request, Response } from 'express';
import { addItemToDb, deleteItemFromDb, getAllItemsFromDb, getAllFilteredItemsFromDb  } from '../services/itemService';

dataRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ message: 'Hello from the server!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.get('/getAllItems', async (req: Request, res: Response) => {
    try {
        const result = await getAllItemsFromDb();
        console.log("successfully got all items");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.get('/addItem', async (req: Request, res: Response) => {
    try {
        const result = await addItemToDb(req.body.name, req.body.description, req.body.price, req.body.polygonName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.get('/deleteItem' , async (req: Request, res: Response) => {
    try {
        const result = await deleteItemFromDb(req.body.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.post('/getAllFilteredItems', async (req: Request, res: Response) => {
    try {
        console.log("RESPONSE HEADER",req.body)
        const result = await getAllFilteredItemsFromDb(req.body.query);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default dataRouter;
