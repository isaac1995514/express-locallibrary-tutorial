const mongoose = require("mongoose");

const user = "isaacleong";
const pwd = "asdf1234";
const database = "local_library";

const mongoDatabaseUrl = `mongodb+srv://${user}:${pwd}@defaultcluster.h4erx.mongodb.net/${database}?retryWrites=true&w=majority`;
mongoose.connect(mongoDatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connetion error:"));

module.exports = db;
