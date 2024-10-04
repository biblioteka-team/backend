import Book from "../models/bookModel.js";
import Author from "../models/authorModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import {recommendBook, getNewBook, getSalesBook, getBestsellerBook, getBooksByLanguage, getBooksByCover, getBooksByAge, getBooksByGenre,
        searchBookByPublisher,  searchBookByTitle, searchBookByAuthor, getBooksByPriceRange} from "../services/bookService.js";
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
  const fields = await sortingFormFields();
  let authorPreferences = req.query.author
  let publisherPreferences = req.query.publisher;
  let newBooksPreferences = req.query.newBook;
  let salesBooksPreferences = req.query.salesBook;
  let bestsellersBooksPreferences = req.query.bestsellersBook;
  let langPreferences = req.query.langId;
  let coverPreferences = req.query.coverId;
  let agePreferences = req.query.ageId;
  let genrePreferences = req.query.genreId;
  let lowPrice = req.query.low;
  let highPrice = req.query.high;
  let requestForSortedBooks = {};

        if(newBooksPreferences === "001"){
          requestForSortedBooks.preferencesByNewBooks = await getNewBook();
        }
        if (salesBooksPreferences === "002") {
          requestForSortedBooks.preferencesBySales = await getSalesBook();
        }
        if (bestsellersBooksPreferences === "003") {
          requestForSortedBooks.preferencesByBestsellers = await getBestsellerBook();
        }
       if(langPreferences) {
          requestForSortedBooks.preferencesByLanguage = await getBooksByLanguage(langPreferences);
        }
        if(coverPreferences) {
          requestForSortedBooks.preferencesByCover = await getBooksByCover(coverPreferences);
        }
       if(agePreferences) {
          requestForSortedBooks.preferencesByAge = await getBooksByAge(agePreferences);
        }
         if(genrePreferences) {
          requestForSortedBooks.preferencesByGenre = await getBooksByGenre(genrePreferences);
        }
        if(authorPreferences) {
          requestForSortedBooks.preferencesByAuthor = await searchBookByAuthor(authorPreferences);
        }
         if(publisherPreferences) {
          requestForSortedBooks.preferencesByPublisher = await searchBookByPublisher(publisherPreferences);
        } 
        if(lowPrice && highPrice){
          requestForSortedBooks.preferencesByPriceRange = await getBooksByPriceRange(lowPrice, highPrice);
        }
        if(!newBooksPreferences && !salesBooksPreferences && bestsellersBooksPreferences && !agePreferences && !authorPreferences && !lowPrice && !highPrice && !langPreferences && !coverPreferences
          && !genrePreferences && !publisherPreferences
        ) {
          requestForSortedBooks.preferencesByBestsellers = await getBestsellerBook();
        }

  res.status(200).json({
    status: "success",
    data: {
      fields: fields,
      newBooks:  requestForSortedBooks.preferencesByNewBooks,
      salesBooks: requestForSortedBooks.preferencesBySales,
      bestsellersBook: requestForSortedBooks.preferencesByBestsellers,
      booksByLanguage: requestForSortedBooks.preferencesByLanguage,
      booksByCover:  requestForSortedBooks.preferencesByCover,
      booksByAge: requestForSortedBooks.preferencesByAge,
      booksByGenre: requestForSortedBooks.preferencesByGenre,
      booksByAuthor: requestForSortedBooks.preferencesByAuthor,
      booksByPublisher: requestForSortedBooks.preferencesByPublisher,
      booksByPriceRange: requestForSortedBooks.preferencesByPriceRange
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
