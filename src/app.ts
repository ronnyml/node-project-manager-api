import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import projectRouter from './routers/project';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Project Manager API');
});
app.use(projectRouter);

export default app;