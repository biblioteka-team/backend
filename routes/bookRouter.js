import express  from "express";
import booksData from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter
   .route("/")
   .get(booksData.getNewAndSalesAndBestsellerBooks);

bookRouter
   .route("/search")
   .get(booksData.searchBookByTitleByAuthor);

bookRouter
   .route("/catalog")
   .get(booksData.getSortedBooksList);

bookRouter
   .route("/:id")
   .get(booksData.getBookbyId);

export default bookRouter;