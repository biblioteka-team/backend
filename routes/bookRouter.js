import express  from "express";
import getNewAndSalesAndBestsellerBooks from "../controllers/booksController.js";

const app = express();
const router = express.Router();



app.use(router);
router
   .route("/api")
   .get(getNewAndSalesAndBestsellerBooks);



  export default router;