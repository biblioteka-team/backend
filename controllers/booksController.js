import Book from "../models/bookModel.js";
import Author from "../models/authorModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import {recommendBook, getNewBook, getSalesBook, getBestsellerBook, getBooksByLanguage} from "../services/bookService.js";

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
    .populate("publisher_id").populate("language_id").populate("category_id"). populate("storage_id");

    const category = bookById.category_id;
    const bookId = req.params.id
    
    const recommendation =  await recommendBook(category, bookId); 

    res.status(200).json({
      status: "success",
      bookById,
      recommendation    
    });
  });

const searchBookByTitleByAuthor = catchAsync(async (req, res, next) => {
  let regex = new RegExp([req.query.q],'i');
  const searchedBookByTitle = await Book.aggregate([
    {$match: { $or: [{ title: regex }, { title_ukr: regex }]}},
    {$lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author"} 
    },
    {$lookup: {
      from: "publishers",
      localField: "publisher_id",
      foreignField: "_id",
      as: "publisher"} 
    },
    {$lookup: {
      from: "languages",
      localField: "language_id",
      foreignField: "_id",
      as: "language"} 
    },
    {$lookup: {
      from: "categories",
      localField: "category_id",
      foreignField: "_id",
      as: "category"} 
    },
    {$lookup: {
      from: "prices",
      localField: "price_id",
      foreignField: "_id",
      as: "price"} 
    },
    { $unset: [ "author_id", "publisher_id", "language_id", "category_id", "price_id", "__v" ] },
]);


  const searchedBookByAuthor = await Author.aggregate([
  {$match: { $or: [{ name: regex }, { surname: regex }, { name_ukr: regex }, { surname_ukr: regex }]}},
  {$lookup: {
    from: "books",
    localField: "_id",
    foreignField: "author_id",
    as: "book",
    } 
  },
  {
    $unwind: {
      path: "$book",
      preserveNullAndEmptyArrays: true
    }
  },
  {$lookup: {
    from: "authors",
    localField: "book.author_id",
    foreignField: "_id",
    as: "book.author"} 
  },
  {$lookup: {
    from: "publishers",
    localField: "book.publisher_id",
    foreignField: "_id",
    as: "book.publisher"} 
  },
  {$lookup: {
    from: "languages",
    localField: "book.language_id",
    foreignField: "_id",
    as: "book.language"} 
  },
  {$lookup: {
    from: "categories",
    localField: "book.category_id",
    foreignField: "_id",
    as: "book.category"} 
  },
  {$lookup: {
    from: "prices",
    localField: "book.price_id",
    foreignField: "_id",
    as: "book.price"} 
  },
  {
    $group: {
      "_id" : "$_id",
      "title": {"$first": "$book.title"},
      "summary": {"$first": "$book.summary"},
      "coverImageLink": {"$first": "$book.coverImageLink"},
      "isbn": {"$first": "$book.isbn"},
      "publication_year": {"$first": "$book.publication_year"},
      "type": {"$first": "$book.type"},
      "condition": {"$first": "$book.condition"},
      "title_ukr": {"$first": "$book.title_ukr"},
      "summary_ukr": {"$first": "$book.summary_ukr"},
      "coverImageLink_ukr":  {"$first": "$book.coverImageLink_ukr"},
      "created": {"$first": "$book.created"},
      "author": {"$first": "$book.author"},
      "publisher": {"$first": "$book.publisher"},
      "language": {"$first": "$book.language"},
      "category": {"$first": "$book.category"},
      "price": {"$first": "$book.price"}
    }
  }
]);


  const searchResult = searchedBookByTitle != 0 ? searchedBookByTitle : searchedBookByAuthor ;

  res.status(200).json({
    status: "success",
    data: {
      searchResult
    },
  });

});

const getSortedBooksList = catchAsync(async (req, res, next) => {
  const match = {};
   if(req.query.completed) {
            match.completed = req.query.completed  === true
      }
  
  let preferences = req.query.q;
  let langPreferences = req.query.lang;
  langPreferences.toString();
  console.log(langPreferences)

  

  let requestForSortedBooks = {};

        if(preferences === "new"){
          requestForSortedBooks = await getNewBook();
        }
        if (preferences === "sales") {
          requestForSortedBooks = await getSalesBook();
        }
        if (preferences === "bestsellers") {
          requestForSortedBooks = await getBestsellerBook();
        }
        if(langPreferences) {
          requestForSortedBooks = await getBooksByLanguage(langPreferences);
        }
        
        // console.log(langPrefernces)
        // console.log(requestForSortedBooks)
  res.status(200).json({
    status: "success",
    data: {
      sortedBooks:  requestForSortedBooks
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
