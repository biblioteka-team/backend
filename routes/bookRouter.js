import express  from "express";
import getNewAndSalesAndBestsellerBooks from "../controllers/booksController.js";

const app = express();
const bookRouter = express.Router();



// app.use(rbookRouter);
bookRouter
   .route("/")
   .get(getNewAndSalesAndBestsellerBooks);



  export default bookRouter;