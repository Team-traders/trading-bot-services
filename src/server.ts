
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
