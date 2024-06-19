import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Author from "../models/authorModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import  textSearch  from "mongoose-partial-full-search";

const getNewAndSalesAndBestsellerBooks = catchAsync(async (req, res, next) => {
    try {
    const [newBooks, salesBooks, bestsellerBooks] = await Promise.all([
        //get new books by date
        Book.find().sort({ created: -1 }).populate("price_id").populate("author_id")
        .populate("publisher_id").populate("language_id").populate("category_id"),

        //get books with discounted price
       Price.find({discounted_price: { $gt: 0.0}}).populate({path: "book_id", 
            populate : [
                { path: "author_id"},
                { path: "publisher_id"},
                { path: "language_id"},
                { path: "category_id"}
            ]
        }),
       
        //get random bestsellers
        Book.find().limit(4).populate("price_id").populate("author_id")
        .populate("publisher_id").populate("language_id").populate("category_id"),
     ]);
      res.json({
        newBooks: newBooks,
        salesBooks: salesBooks,
        bestsellerBooks: bestsellerBooks
    })
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

const getBookbyId = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate("price_id").populate("author_id")
    .populate("publisher_id").populate("language_id").populate("category_id");
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  });

const searchBookByTitleByAuthor = catchAsync(async (req, res, next) => {
  const {searchparam} = req.params;
  let regex = new RegExp([searchparam],'i');
  const searchedBookByTitle = await Book.aggregate([
          {$match: { $or: [{ title: regex }, { title_ukr: regex }]}},
          {$lookup: {
            from: "authors",
            localField: "author_id",
            foreignField: "_id",
            as: "author"} 
          }

]);

const searchedBookByAuthor = await Author.aggregate([
  {$match: { $or: [{ name: regex }, { name_ukr: regex }, { surname: regex }, { surname_ukr: regex }]}},
  {$lookup: {
    from: "books",
    localField: "_id",
    foreignField: "author_id",
    as: "book"} 
  },
])
  res.status(200).json({
    status: "success",
    data: {
      searchedBookByTitle,
      searchedBookByAuthor
    },
  });

});
  
const booksData = {
    getNewAndSalesAndBestsellerBooks,
    getBookbyId,
    searchBookByTitleByAuthor
}

export default booksData;
