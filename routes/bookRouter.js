import express  from "express";
import booksData from "../controllers/booksController.js";

const app = express();
const bookRouter = express.Router();

bookRouter
   .route("/")
   .get(booksData.getNewAndSalesAndBestsellerBooks);

bookRouter
   .route("/:id")
   .get(booksData.getBookbyId)

  export default bookRouter;