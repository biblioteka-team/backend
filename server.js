const mongoose = require("mongoose");
const app = require("./app.js");
const donenv = require("dotenv");
donenv.config({path: "./.env"});

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.PASSWORD
);

//connect to Mongo DB
mongoose.connect(DB).then(() => {
    console.log("DB connected");
})

const port = 3000;

app.listen(port, () => {
    console.log("app running")
});