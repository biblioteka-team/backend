const express = require("express");
const morgan = require("morgan");
const handler = require("./utils/uploadImages");

const bookRouter = require("./routes/bookRouter");

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

app.use(express.json());

app.get("/", bookRouter);
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.post('/upload', async (_req) => {
    const request = _req;
    await handler(request);
  })


module.exports = app; 