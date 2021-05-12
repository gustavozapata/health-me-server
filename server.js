const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// dotenv.config({ path: "./.env" });

// const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);
const DB = process.env.DB_URI_LOCAL //to connect to local (pi 4) mongodb

//connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("*** Connected to the database ***");
  });

const port = process.env.PORT || 4000;

//create and start server
app.listen(4000, () => console.log(`*** Server running on port ${port} ***`));
