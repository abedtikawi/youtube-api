const mongoose = require("mongoose");
const db = process.env.MONGO_URL;
// connect to mongoDB atlas
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Connected to Database`);
  } catch (err) {
    if (err.name === "MongoNetworkError" || err.code === "ECONNREFUSED") {
      return console.log("no internet on server");
    }
    
    mongoose.connection.on("error", function (err) {
      console.error("Failed to connect to DB on startup ", err);
    });

    // handle When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose default connection to DB disconnected");
    });
    console.log("Connection Error", err);
    // terminate process
    process.exit(1);
  }
};
module.exports = connectDB;
