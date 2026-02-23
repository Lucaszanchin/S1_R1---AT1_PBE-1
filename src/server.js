import express from 'express';
import 'dotenv/config';
import { router } from './routes/router.js'; 

const app = express();

app.use(express.json()); 
app.use('/', router);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});