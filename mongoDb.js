const mongoose = require("mongoose");
const mongoDatabaseUrl =
  "mongodb+srv://isaacleong:asdf1234@defaultcluster.h4erx.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connetion error:"));

module.exports = db;
