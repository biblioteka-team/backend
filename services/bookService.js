
import Category from "../models/categoryModel.js";

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
