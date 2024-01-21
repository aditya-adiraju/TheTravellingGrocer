const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import { addItemToDb, deleteItemFromDb, getAllItemsFromDb, getAllFilteredItemsFromDb  } from '../services/itemService';


router.get('/getAllItems', async (req: Request, res: Response) => {
    try {
        const result = getAllItemsFromDb();
        console.log("successfully got all items");
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/addItem', async (req: Request, res: Response) => {
    try {
        const result = addItemToDb(req.body.name, req.body.description, req.body.price, req.body.polygonName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/deleteItem', async (req: Request, res: Response) => {
    try {
        const result = deleteItemFromDb(req.body.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllFilteredItems', async (req: Request, res: Response) => { 
    try {
        const result = getAllFilteredItemsFromDb(req.body.polygonName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;