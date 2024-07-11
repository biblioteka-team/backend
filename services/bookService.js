import Author from "../models/authorModel.js";
import Category from "../models/categoryModel.js";

export const recommendBook =  async (category, bookId) => {
try{
  const [recommendedBookByCategory] = await Promise.all([
        // Author.find(writer)
        // .populate().populate("price_id").populate("author_id")
        // .populate("publisher_id").populate("language_id").populate("category_id").sort({ "_id": 1, "title": 1, 
        // "_summary": 1, "coverImageLink": 1, "isbn": 1, "publication_year": 1, "type": 1, "condition": 1, 
        // "title_ukr": 1, "summary_ukr": 1, "coverImageLink_ukr": 1, "created": 1, "author": 1, "publisher": 1,
        // "language": 1, "category": 1, "price": 1})
        // Author.aggregate([
        //     {$match: { $or: [{surname: author[0].surname}, { surname_ukr: author[0].surname_ukr }]}},
        //         {$lookup: {
        //             from: "books",
        //             localField: "_id",
        //             foreignField: "author_id",
        //             as: "book",
        //             } 
        //         },
        //         {
        //             $unwind: {
        //             path: "$book",
        //             preserveNullAndEmptyArrays: true
        //             }
        //         },
        //         {$lookup: {
        //             from: "authors",
        //             localField: "book.author_id",
        //             foreignField: "_id",
        //             as: "book.author"} 
        //         },
        //         {$lookup: {
        //             from: "publishers",
        //             localField: "book.publisher_id",
        //             foreignField: "_id",
        //             as: "book.publisher"} 
        //         },
        //         {$lookup: {
        //             from: "languages",
        //             localField: "book.language_id",
        //             foreignField: "_id",
        //             as: "book.language"} 
        //         },
        //         {$lookup: {
        //             from: "categories",
        //             localField: "book.category_id",
        //             foreignField: "_id",
        //             as: "book.category"} 
        //         },
        //         {$lookup: {
        //             from: "prices",
        //             localField: "book.price_id",
        //             foreignField: "_id",
        //             as: "book.price"} 
        //         },
        //         {
        //             $group: {
        //             "_id" : "$book._id",
        //             "title": {"$first": "$book.title"},
        //             "summary": {"$first": "$book.summary"},
        //             "coverImageLink": {"$first": "$book.coverImageLink"},
        //             "isbn": {"$first": "$book.isbn"},
        //             "publication_year": {"$first": "$book.publication_year"},
        //             "type": {"$first": "$book.type"},
        //             "condition": {"$first": "$book.condition"},
        //             "title_ukr": {"$first": "$book.title_ukr"},
        //             "summary_ukr": {"$first": "$book.summary_ukr"},
        //             "coverImageLink_ukr":  {"$first": "$book.coverImageLink_ukr"},
        //             "created": {"$first": "$book.created"},
        //             "author": {"$first": "$book.author"},
        //             "publisher": {"$first": "$book.publisher"},
        //             "language": {"$first": "$book.language"},
        //             "category": {"$first": "$book.category"},
        //             "price": {"$first": "$book.price"}
        //             }
        //         }
        // ]),

        Category.aggregate([
                {$match: {_id: category[0]._id }},
                {$lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "book",   
                }
                },
                // {$project: {
                //     // "$book": {
                //         $filter: {
                //         input: "$book",
                //         as: "b",
                //         cond: {$ne:["$$b._id", bookId]}
                //         // }
                //     }
                // }},
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
                    "price": {"$first": "$book.price"}
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