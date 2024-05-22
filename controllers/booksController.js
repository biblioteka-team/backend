const Book = require("../models/bookModel");
const Price = require("../models/priceModel");
const catchAsync = require("../utils/catchAsync");

exports.getNewAndSalesAndBestsellerBooks = catchAsync(async (req, res, next) => {
    try {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    date.toDateString();
    const [newBooks, salesBooks, bestsellerBooks] = await Promise.all([
        Book.find({created: {$gte: date, 
            $lt: new Date()}}).populate("price_id"),
        Price.find({discounted_price: { $gt: 0.0}}).populate("book_id"),
        Book.aggregate([
            { $sample: { size: 4 } },
            { $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "book_id",
                as: "price"
            }}
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
