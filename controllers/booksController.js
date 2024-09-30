import Book from "../models/bookModel.js";
import Author from "../models/authorModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import {recommendBook, getNewBook, getSalesBook, getBestsellerBook, getBooksByLanguage, searchBookByTitle, searchBookByAuthor} from "../services/bookService.js";
import { sortingFormFields } from "../services/formService.js";

const getNewAndSalesAndBestsellerBooks = catchAsync(async (req, res, next) => {
    try {
    const [newBooks, salesBooks, bestsellerBooks] = await Promise.all([
        //get new books by date
        getNewBook(),

        //get books with discounted price
        getSalesBook(),
       
        //get random bestsellers
        getBestsellerBook()
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
    const bookById = await Book.findById(req.params.id).populate("price_id").populate("author_id")
    .populate("publisher_id").populate("language_id").populate("genre_id"). populate("storage_id");

    const genre = bookById.genre_id;
    const bookId = req.params.id
    
    const recommendation =  await recommendBook(genre, bookId); 

    res.status(200).json({
      status: "success",
      bookById,
      recommendation    
    });
  });

const searchBookByTitleByAuthor = catchAsync(async (req, res, next) => {
  let regex = new RegExp([req.query.q],'i');

   const bookByTitle = await searchBookByTitle(regex);
   const bookByAuthor = await searchBookByAuthor(regex);

  const searchResult = bookByTitle != 0 ? bookByTitle : bookByAuthor;

  res.status(200).json({
    status: "success",
    data: {
      searchResult
    },
  });

});

const getSortedBooksList = catchAsync(async (req, res, next) => {
  // const match = {};
  //  if(req.query.completed) {
  //           match.completed = req.query.completed  === true
  //     }
  
  const fields = await sortingFormFields();
  let preferences = req.query.id;
  let langPreferences = req.query.langId;
  // let coverPreferences = req.query.cover;
  // langPreferences.toString();
  // overPreferences.toString();
  console.log(langPreferences)

  let requestForSortedBooks = {};

        if(preferences === "001"){
          requestForSortedBooks.preferences = await getNewBook();
        }
        if (preferences === "002") {
          requestForSortedBooks.preferences = await getSalesBook();
        }
        if (preferences === "003") {
          requestForSortedBooks.preferences = await getBestsellerBook();
        }
        if(langPreferences) {
          requestForSortedBooks.preferencesByLanguage = await getBooksByLanguage(langPreferences);
        }
        // if(coverPreferences) {
        //   requestForSortedBooks.preferencesByCover = await getBooksByCover(coverPreferences);
        // }

  res.status(200).json({
    status: "success",
    data: {
      fields: fields,
      sortedBooksPreferences:  requestForSortedBooks.preferences,
      booksByLanguage: requestForSortedBooks.preferencesByLanguage,
      // booksByCover:  requestForSortedBooks.preferencesByCover

    },
  })
});

  
const booksData = {
    getNewAndSalesAndBestsellerBooks,
    getBookbyId,
    searchBookByTitleByAuthor, 
    getSortedBooksList
};

export default booksData;
