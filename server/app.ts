import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as path from 'path';
const cors = require('cors');

import { connectToMongo } from './mongo';
const bodyParser = require('body-parser');
import dataRouter from './routes/data.router';

const app = express();
app.use(cors())
app.use(bodyParser.json());
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