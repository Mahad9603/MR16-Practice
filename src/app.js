import 'dotenv/config.js'
import express from 'express';
import { connectingDB } from "./db/config.js";
import syncDB from "./db/init.js";
import allRoutes from './routes/index.js';


connectingDB()
syncDB()

const app = express()
app.use(express.json())
app.use(allRoutes)

app.listen(3000, ()=> {
    console.log("Server Started Sucessfully")
});
