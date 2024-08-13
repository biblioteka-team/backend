// import Book from "../models/bookModel"

// export const  requestBookByCover = [
//     Book.aggregate([
//         {$match: { coverType: }},
//         {$lookup: {
//             from: "authors",
//             localField: "author_id",
//             foreignField: "_id",
//             as: "author"} 
//           },
//           {$lookup: {
//             from: "publishers",
//             localField: "publisher_id",
//             foreignField: "_id",
//             as: "publisher"} 
//           },
//           {$lookup: {
//             from: "languages",
//             localField: "language_id",
//             foreignField: "_id",
//             as: "language"} 
//           },
//           {$lookup: {
//             from: "categories",
//             localField: "category_id",
//             foreignField: "_id",
//             as: "category"} 
//           },
//           {$lookup: {
//             from: "prices",
//             localField: "price_id",
//             foreignField: "_id",
//             as: "price"} 
//           },
//           { $unset: [ "author_id", "publisher_id", "language_id", "category_id", "price_id", "__v" ] },
//           {
//             $group: {
//               "_id" : "$book._id",
//               "title": {"$first": "$book.title"},
//               "summary": {"$first": "$book.summary"},
//               "coverImageLink": {"$first": "$book.coverImageLink"},
//               "isbn": {"$first": "$book.isbn"},
//               "publication_year": {"$first": "$book.publication_year"},
//               "type": {"$first": "$book.type"},
//               "condition": {"$first": "$book.condition"},
//               "title_ukr": {"$first": "$book.title_ukr"},
//               "summary_ukr": {"$first": "$book.summary_ukr"},
//               "coverImageLink_ukr":  {"$first": "$book.coverImageLink_ukr"},
//               "created": {"$first": "$book.created"},
//               "author": {"$first": "$book.author"},
//               "publisher": {"$first": "$book.publisher"},
//               "language": {"$first": "$book.language"},
//               "category": {"$first": "$book.category"},
//               "price": {"$first": "$book.price"}
//             }
//           }
//     ])
// ]