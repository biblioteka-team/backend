import express  from "express";
import booksData from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter
   .route("/")
   .get(booksData.getNewAndSalesAndBestsellerBooks);

bookRouter
   .route("/search/:title")
   .get(booksData.searchBookByTitleByAuthor);

bookRouter
   .route("/:id")
   .get(booksData.getBookbyId);


export default bookRouter;