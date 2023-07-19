const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_DB)
     console.log("connected");
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB