import express from 'express';
import mailRouter from '../src/route/mailRoute';
const app = express();

app.use(express.json());

app.get('/', mailRouter);

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
