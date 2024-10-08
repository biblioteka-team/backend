import express from "express";
import booksData from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter.route("/get-books").get(booksData.getNewAndSalesAndBestsellerBooks);

bookRouter.route("/search").get(booksData.searchBookByTitleByAuthor);

bookRouter.route("/catalog").get(booksData.getSortedBooksList);

bookRouter.route("/book/show/:id").get(booksData.getBookbyId);

export default bookRouter;
