const env = require('dotenv')
env.config()

const express = require('express');
const mongoConnect = require('./middlewares/mongoConnect');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())


//Routes
app.use('/api', require('./routes/userRoute'));

mongoConnect;

app.listen('8800',()=>{
  console.log('app is up and running')
})