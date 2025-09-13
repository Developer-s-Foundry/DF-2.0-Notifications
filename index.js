import express from 'express';
import cors from 'cors';
import notificationRouter from './route/notificaton.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', notificationRouter);


app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);

});