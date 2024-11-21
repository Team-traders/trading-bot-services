import { initializeApp } from "./app";

(async () => {
  
  const {rabbitMQConsumer} = initializeApp()
  console.log("rabbitMQConsumer");

}) ()







//import express from 'express';
//import mailRouter from './infra/api/route/MailRoute'
//const app = express();


//app.use(express.json());

//app.use('/api/notification', mailRouter);

//app.listen(3000, () => {
//  console.log(`Example app listening on port ${3000}`);
//});