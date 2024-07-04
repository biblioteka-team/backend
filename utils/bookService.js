import Author from "../models/authorModel.js";
import Category from "../models/categoryModel.js";

export const recommendBook =  async (author, category) => {
try{
  const [recomendedBookByAuthor, recommendedBookByCategory] = await Promise.all([
        Author.aggregate([
            {$match: { $or: [{surname: author[0].surname}, { surname_ukr: author[0].surname_ukr }]}},
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
        ]),

        Category.aggregate([
            {$match: { $or: [{category: category[0].category }, { category_ukr: category[0].category }]}},
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
        ])
    ]);
    return {recomendedBookByAuthor: recomendedBookByAuthor, 
                         recommendedBookByCategory: recommendedBookByCategory};                  
    } catch (err) {
        console.error(err);
    }
};