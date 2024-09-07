
import Category from "../models/categoryModel.js";
import Book from "../models/bookModel.js";
import Price from "../models/priceModel.js";
import Language from "../models/languageModel.js";

export const recommendBook =  async (category, bookId) => {
try{
  const [recommendedBookByCategory] = await Promise.all([
        Category.aggregate([
                {$match: {_id: category[0]._id }},
                {$lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "category_id",
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
        return bestsellerBooksRequest;
    }catch(err) {
        console.error(err);
    }
    
}

//for test

export const getBooksByLanguage = async(langPreferences) => {
  try{
    const [sortedBooksByLanguage] = await Promise.all([
      Language.aggregate([
        {$match: {language: langPreferences}},
        {$lookup: {
          from: "books",
          localField: "_id",
          foreignField: "language_id",
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
            "_id" : "$book._id",
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
        ])
      ]);
      return  sortedBooksByLanguage;               
      } catch (err) {
          console.error(err);
      }

}

// export const getBooksByCover = async(coverPreferences) => {
//   try {
//   const [sortedBooksByCover] = await Promise.all([
//     Book.aggregate([
//       {$match: { coverType: coverPreferences}},
//       {$lookup: {
//           from: "authors",
//           localField: "author_id",
//           foreignField: "_id",
//           as: "author"} 
//         },
//         {$lookup: {
//           from: "publishers",
//           localField: "publisher_id",
//           foreignField: "_id",
//           as: "publisher"} 
//         },
//         {$lookup: {
//           from: "languages",
//           localField: "language_id",
//           foreignField: "_id",
//           as: "language"} 
//         },
//         {$lookup: {
//           from: "categories",
//           localField: "category_id",
//           foreignField: "_id",
//           as: "category"} 
//         },
//         {$lookup: {
//           from: "prices",
//           localField: "price_id",
//           foreignField: "_id",
//           as: "price"} 
//         },
//         { $unset: [ "author_id", "publisher_id", "language_id", "category_id", "price_id", "__v" ] },
//         {
//           $group: {
//             "_id" : "$_id",
//             "title": {"$first": "$title"},
//             "summary": {"$first": "$summary"},
//             "coverImageLink": {"$first": "$coverImageLink"},
//             "isbn": {"$first": "$isbn"},
//             "publication_year": {"$first": "$publication_year"},
//             "type": {"$first": "$type"},
//             "condition": {"$first": "$condition"},
//             "title_ukr": {"$first": "$title_ukr"},
//             "summary_ukr": {"$first": "$summary_ukr"},
//             "coverImageLink_ukr":  {"$first": "$coverImageLink_ukr"},
//             "created": {"$first": "$created"},
//             "author": {"$first": "$author"},
//             "publisher": {"$first": "$publisher"},
//             "language": {"$first": "$language"},
//             "category": {"$first": "$category"},
//             "price": {"$first": "$price"}, 
//             "coverType": {"$first": "$coverType"}
//           }
//         }
//   ])
//   ])
//   return sortedBooksByCover;
//   } catch(err) {
//     console.log(err);
//   }
// }