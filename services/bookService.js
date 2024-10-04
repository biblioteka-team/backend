
import Category from "../models/categoryModel.js";
import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Language from "../models/languageModel.js";
import Author from "../models/authorModel.js";
import Genre from "../models/genreModel.js";
import Publisher from "../models/publisherModel.js";

export const recommendBook =  async (genre, bookId) => {
try{
  const [recommendedBookByCategory] = await Promise.all([
        Genre.aggregate([
                {$match: {_id: genre[0]._id }},
                {$lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "genre_id",
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
                    from: "genres",
                    localField: "book.genre_id",
                    foreignField: "_id",
                    as: "book.genre"} 
                },
                {$lookup: {
                    from: "prices",
                    localField: "book.price_id",
                    foreignField: "_id",
                    as: "book.price"} 
                },
                {
                    $group: {
                    "_id" : "$book._id",
                    "title": {"$first": "$book.title"},
                    "coverImageLink": {"$first": "$book.coverImageLink"},
                    "title_ukr": {"$first": "$book.title_ukr"},
                    "summary_ukr": {"$first": "$book.summary_ukr"},
                    "coverImageLink_ukr":  {"$first": "$book.coverImageLink_ukr"},
                    "author": {"$first": "$book.author"},
                    "price": {"$first": "$book.price"},
                    }
                },
        ])
    ]);
    const recommendation = recommendedBookByCategory.filter(el => el._id != bookId);
    return  recommendation;               
    } catch (err) {
        console.error(err);
    }
};


export const getNewBook = async () => {
    try {
        const [newBooksRequest] = await Promise.all([
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
                  from: "genres",
                  localField: "genre_id",
                  foreignField: "_id",
                  as: "genre"} 
                },
                {$lookup: {
                  from: "prices",
                  localField: "price_id",
                  foreignField: "_id",
                  as: "price"} 
                },
                { $unset: [ "author_id", "publisher_id", "language_id", "genre_id", "price_id", "__v" ] },
                {
                  $group: {
                    "_id" : "$_id",
                    "title": {"$first": "$title"},
                    "summary": {"$first": "$summary"},
                    "coverImageLink": {"$first": "$coverImageLink"},
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
                    "genre": {"$first": "$genre"},
                    "price": {"$first": "$price"}
                  }
                }
            ])
        ]);
        return newBooksRequest;
    }catch(err) {
        console.error(err);
    }
    
}

export const getSalesBook = async () => {
    try {
        const [salesBooksRequest] = await Promise.all([
            Price.aggregate([{$match: {
                discounted_price: { $gt: 0.0}
              }}, {
                $lookup: {
                  from: "books",
                  localField: "_id",
                  foreignField: "price_id",
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
                from: "genres",
                localField: "book.genre_id",
                foreignField: "_id",
                as: "book.genre"} 
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
                  "genre": {"$first": "$book.genre"},
                  "price": {"$first": "$book.price"}
                }}  
            ]),
        ]);
        return salesBooksRequest;
    }catch(err) {
        console.error(err);
    }
    
}

export const getBestsellerBook = async () => {
    try {
        const [bestsellerBooksRequest] = await Promise.all([
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
                  from: "genres",
                  localField: "genre_id",
                  foreignField: "_id",
                  as: "genre"} 
                },
                {$lookup: {
                  from: "prices",
                  localField: "price_id",
                  foreignField: "_id",
                  as: "price"} 
                },
                { $unset: [ "author_id", "publisher_id", "language_id", "genre_id", "price_id", "__v" ] },
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
                    "genre": {"$first": "$genre"},
                    "price": {"$first": "$price"}
                  }
                }
                ])
        ]);
        return bestsellerBooksRequest;
    }catch(err) {
        console.error(err);
    }
    
}

export const searchBookByTitle = async(regex) => {
  try{
    const [bookByTitle] = await Promise.all([
        Book.aggregate([
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
            from: "genres",
            localField: "genre_id",
            foreignField: "_id",
            as: "genre"} 
          },
          {$lookup: {
            from: "prices",
            localField: "price_id",
            foreignField: "_id",
            as: "price"} 
          },
          { $unset: [ "author_id", "publisher_id", "language_id", "genre_id", "price_id", "__v" ] },
        ])
   ])
   return bookByTitle;
  } catch(err) {
    console.error(err);
  }
}

export const searchBookByAuthor = async(regex) => {
  try{
    const [bookByAuthor] = await Promise.all([
      await Author.aggregate([
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
          from: "genres",
          localField: "book.genre_id",
          foreignField: "_id",
          as: "book.genre"} 
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
            "genre": {"$first": "$book.genre"},
            "price": {"$first": "$book.price"}
          }
        }
      ])
    ])
    return bookByAuthor;
  } catch(err) {
    console.error(err);
  }
}

export const searchBookByPublisher = async(regexPublisher) => {
  try{
    const [bookByPublisher] = await Promise.all([
      await Publisher.aggregate([
        {$match: { publisher: regexPublisher }},
        {$lookup: {
          from: "books",
          localField: "_id",
          foreignField: "publisher_id",
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
          from: "genres",
          localField: "book.genre_id",
          foreignField: "_id",
          as: "book.genre"} 
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
            "genre": {"$first": "$book.genre"},
            "price": {"$first": "$book.price"}
          }
        }
      ])
    ])
    return bookByPublisher;
  } catch(err) {
    console.error(err);
  }
}

export const getBooksByLanguage = async(langPreferences) => {
  try{
    const [sortedBooksByLanguage] = await Promise.all([
     Book.find({language_id: langPreferences}).populate("price_id").populate("author_id")
    .populate("publisher_id").populate("language_id").populate("genre_id"). populate("storage_id")
    //     _id:  [langPreferences]
    //   }}, {
    //     $lookup: {
    //       from: "books",
    //       localField: "_id",
    //       foreignField: "language_id",
    //       as: "book"}
    //   }, 
    //   {
    //     $unwind: {
    //       path: "$book",
    //       preserveNullAndEmptyArrays: true
    //     }
    //   },
    //   {$lookup: {
    //     from: "authors",
    //     localField: "book.author_id",
    //     foreignField: "_id",
    //     as: "book.author"} 
    //   },
    //   {$lookup: {
    //     from: "publishers",
    //     localField: "book.publisher_id",
    //     foreignField: "_id",
    //     as: "book.publisher"} 
    //   },
    //   {$lookup: {
    //     from: "languages",
    //     localField: "book.language_id",
    //     foreignField: "_id",
    //     as: "book.language"} 
    //   },
    //   {$lookup: {
    //     from: "genres",
    //     localField: "book.genre_id",
    //     foreignField: "_id",
    //     as: "book.genre"} 
    //   },
    //   {$lookup: {
    //     from: "prices",
    //     localField: "book.price_id",
    //     foreignField: "_id",
    //     as: "book.price"} 
    //   },
    //   {
    //     $group: {
    //       "_id" : "$_id",
    //       "title": {"$first": "$book.title"},
    //       "summary": {"$first": "$book.summary"},
    //       "coverImageLink": {"$first": "$book.coverImageLink"},
    //       "isbn": {"$first": "$book.isbn"},
    //       "publication_year": {"$first": "$book.publication_year"},
    //       "type": {"$first": "$book.type"},
    //       "condition": {"$first": "$book.condition"},
    //       "title_ukr": {"$first": "$book.title_ukr"},
    //       "summary_ukr": {"$first": "$book.summary_ukr"},
    //       "coverImageLink_ukr":  {"$first": "$book.coverImageLink_ukr"},
    //       "created": {"$first": "$book.created"},
    //       "author": {"$first": "$book.author"},
    //       "publisher": {"$first": "$book.publisher"},
    //       "language": {"$first": "$book.language"},
    //       "genre": {"$first": "$book.genre"},
    //       "price": {"$first": "$book.price"}
    //     }}  
    // ]),
      ]);
      return  sortedBooksByLanguage;               
      } catch (err) {
          console.error(err);
      }
}

export const getBooksByCover = async(coverPreferences) => {
  try {
  const [sortedBooksByCover] = await Promise.all([
    Book.find({coverType_id: coverPreferences}).populate("price_id").populate("author_id")
    .populate("publisher_id").populate("language_id").populate("genre_id"). populate("storage_id")
  ])
  return sortedBooksByCover;
  } catch(err) {
    console.log(err);
  }
}

export const getBooksByAge = async(agePreferences) => {
 try{
  const [sortedBooksByAge] = await Promise.all([
    Book.find({age_id: agePreferences}).populate("price_id").populate("author_id")
    .populate("publisher_id").populate("language_id").populate("genre_id"). populate("storage_id")
  ])
  return sortedBooksByAge;
 }catch(err) {
    console.log(err);
  }
}

export const getBooksByGenre = async(genrePreferences) => {
  try{
   const [sortedBooksByGenre] = await Promise.all([
     Book.find({genre_id: genrePreferences}).populate("price_id").populate("author_id")
     .populate("publisher_id").populate("language_id").populate("genre_id"). populate("storage_id")
])
   return sortedBooksByGenre;
  }catch(err) {
     console.log(err);
   }
 }

export const getBooksByPriceRange = async(lowPrice, highPrice) => {
  try{
    const [sortedBooksByPriceRange] = await Promise.all([
    Price.aggregate([{$match: {
        original_price : { $lte: parseFloat(lowPrice)},
        original_price: { $gt: parseFloat(highPrice)}
      }}, {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "price_id",
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
        from: "genres",
        localField: "book.genre_id",
        foreignField: "_id",
        as: "book.genre"} 
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
            "genre": {"$first": "$book.genre"},
            "price": {"$first": "$book.price"}
        }}  
    ])
    ])
    return sortedBooksByPriceRange;
  }catch(err) {
     console.log(err);
   }
} 