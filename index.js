import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import notificationRouter from './route/notificaton.js';

await mongoose.connect(process.env.MONGO_URL)

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', notificationRouter);


app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);

});