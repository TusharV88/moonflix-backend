import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import "dotenv/config";
import routes from './src/routes/index.js';

const app = express();

app.use(
    cors({
        origin: "https://moonflix.onrender.com",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use('/api/v1', routes);
app.get('/', (req, res) => {
    res.send('Server is running !');
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected Successfully !');
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}).catch(err => {
    console.log(err);
    process.exit(1);
});

