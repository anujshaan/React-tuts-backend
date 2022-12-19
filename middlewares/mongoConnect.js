const mongoose = require('mongoose');


const URL = process.env.MONGO_URL;

mongoose.set('strictQuery', true);
const mongoConnect = mongoose.connect(URL,()=>{
  console.log("database connected succssfully")
})

module.exports = mongoConnect;