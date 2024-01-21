import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as path from 'path';

import { connectToMongo } from './mongo';
import dataRouter from './routes/data.router';
const CORS = require('cors');

const app = express();
app.use(CORS());
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api/data', dataRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const main = async (): Promise<void> => {
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

export { app };
