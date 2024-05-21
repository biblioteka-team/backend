const express = require("express");
const bookController = require("../controllers/booksController");
const app = express();
const router = express.Router();
app.use(router);
router
   .route("/")
   .get(bookController.getNewBooks);


   module.exports = router;