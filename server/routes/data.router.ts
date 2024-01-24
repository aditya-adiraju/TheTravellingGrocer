import express from 'express';
const dataRouter = express.Router();
import { Request, Response } from 'express';
import { solveTSP } from '../tsp_wrapper.js';
import { addItemToDb, deleteItemFromDb, getAllItemsFromDb, getAllFilteredItemsFromDb  } from '../services/itemService.js';

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
        console.log("RESPONSE HEADER",await req.body)
        const result = await getAllFilteredItemsFromDb(req.body.query);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


dataRouter.post('/getOptimalRoute', async (req: Request, res: Response) => {
    try {
        const result = await solveTSP(req.body.array);
        console.log(result, "RESULT SERVER");
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default dataRouter;
