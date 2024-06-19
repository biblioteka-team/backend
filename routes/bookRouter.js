import express  from "express";
import booksData from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter
   .route("/")
   .get(booksData.getNewAndSalesAndBestsellerBooks);

bookRouter
   .route("/search/:searchparam")
   .get(booksData.searchBookByTitleByAuthor);

bookRouter
   .route("/:id")
   .get(booksData.getBookbyId);


export default bookRouter;