import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Author from "../models/authorModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import {recommendBook} from "../utils/bookService.js";

const getNewAndSalesAndBestsellerBooks = catchAsync(async (req, res, next) => {
    try {
    const [newBooks, salesBooks, bestsellerBooks] = await Promise.all([
        //get new books by date
          Book.aggregate([
            { $sort: { created: -1 } },
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
            {
              $group: {
                "_id" : "$_id",
                "title": {"$first": "$title"},
                "summary": {"$first": "$summary"},
                "coverImageLink": {"$first": "$coverImageLink"},
                "isbn": {"$first": "$isbn"},
                "publication_year": {"$first": "$publication_year"},
                "type": {"$first": "$type"},
                "condition": {"$first": "$condition"},
                "title_ukr": {"$first": "$title_ukr"},
                "summary_ukr": {"$first": "$summary_ukr"},
                "coverImageLink_ukr":  {"$first": "$coverImageLink_ukr"},
                "created": {"$first": "$created"},
                "author": {"$first": "$author"},
                "publisher": {"$first": "$publisher"},
                "language": {"$first": "$language"},
                "category": {"$first": "$category"},
                "price": {"$first": "$price"}
              }
            }
        ]),

        //get books with discounted price
        Price.aggregate([{$match: {
          discounted_price: { $gt: 0.0}
        }}, {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book"}
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
          }}  
      ]),
       
        //get random bestsellers
        Book.aggregate([
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
        {
          $group: {
            "_id" : "$_id",
            "title": {"$first": "$title"},
            "summary": {"$first": "$summary"},
            "coverImageLink": {"$first": "$coverImageLink"},
            "isbn": {"$first": "$isbn"},
            "publication_year": {"$first": "$publication_year"},
            "type": {"$first": "$type"},
            "condition": {"$first": "$condition"},
            "title_ukr": {"$first": "$title_ukr"},
            "summary_ukr": {"$first": "$summary_ukr"},
            "coverImageLink_ukr":  {"$first": "$coverImageLink_ukr"},
            "created": {"$first": "$created"},
            "author": {"$first": "$author"},
            "publisher": {"$first": "$publisher"},
            "language": {"$first": "$language"},
            "category": {"$first": "$category"},
            "price": {"$first": "$price"}
          }
        }
        ])
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
    .populate("publisher_id").populate("language_id").populate("category_id").sort({ "_id": 1, "title": 1, 
    "_summary": 1, "coverImageLink": 1, "isbn": 1, "publication_year": 1, "type": 1, "condition": 1, 
    "title_ukr": 1, "summary_ukr": 1, "coverImageLink_ukr": 1, "created": 1, "author": 1, "publisher": 1,
    "language": 1, "category": 1, "price": 1});



    const author = book.author_id;
    const category = book.category_id;
    
    const recommendation =  await recommendBook(author, category); 
    res.status(200).json({
      status: "success",
      dataById: {
        book,
      },
      recommendedBook: {
        recommendation
      }
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

  
const booksData = {
    getNewAndSalesAndBestsellerBooks,
    getBookbyId,
    searchBookByTitleByAuthor, 
}

export default booksData;
