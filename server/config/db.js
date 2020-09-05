const mongoose = require('mongoose');
const config = require('config');


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.get("MONGO_URI"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log(`MongoDB connected ${conn.connection.host}`);

  } catch (error) {
    console.log(error.message);
    process.exit(1);

  }

}


module.exports = connectDB;