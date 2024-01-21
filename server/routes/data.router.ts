const express = require('express');
const dataRouter = express.Router();
import { Request, Response } from 'express';
import { addItemToDb, deleteItemFromDb, getAllItemsFromDb, getAllFilteredItemsFromDb  } from '../services/itemService';
import { validateAccessToken } from "../middleware/auth0.middleware";

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

dataRouter.get('/addItem', validateAccessToken, async (req: Request, res: Response) => {
    try {
        const result = await addItemToDb(req.body.name, req.body.description, req.body.price, req.body.polygonName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.get('/deleteItem', validateAccessToken, async (req: Request, res: Response) => {
    try {
        const result = await deleteItemFromDb(req.body.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

dataRouter.get('/getAllFilteredItems', validateAccessToken, async (req: Request, res: Response) => { 
    try {
        const result = await getAllFilteredItemsFromDb(req.body.polygonName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default dataRouter;