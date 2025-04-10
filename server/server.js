const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const loginRouter = require('./src/routes/loginRouter.js')
const connectDB = require('./src/mongoDB/connectDB.js')
const app = express()


dotenv.config()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const allowedOrigins = ['https://login-task-g08s.onrender.com', 'http://localhost:3000'];
const corsOptions = {
  origin: allowedOrigins, // Explicitly allow your frontend origin
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Allow cookies and credentials (if required)
};

app.use(cors(corsOptions));

  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()
app.use('/api/login', loginRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})