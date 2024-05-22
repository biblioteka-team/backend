const express = require("express");
const bookController = require("../controllers/booksController.js");
const app = express();
const router = express.Router();
app.use(router);
router
   .route("/")
   .get(bookController.getNewAndSalesAndBestsellerBooks);


   module.exports = router;