import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dataRouter from './routes/data.router.js';
import connectToMongo  from './mongo.js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));
// app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api/data', dataRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const main = async (): Promise<void> => {

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  try {
    await connectToMongo();
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

main();

export default app;