import express from 'express';
import mailRouter from '../src/route/mailRoute'
const app = express();


app.use(express.json());

app.use('/api/notification', mailRouter);

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});