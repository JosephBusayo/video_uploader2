import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js'


dotenv.config()
const app = express()
const videoSessions = new Map()
const PORT = process.env.PORT || 3002

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', videoRoutes)


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})