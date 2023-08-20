import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const serverHttp = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Hello, World");
});

serverHttp.listen(5000,() => console.log("Server is started on port 5000"));
