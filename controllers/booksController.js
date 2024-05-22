const Book = require("../models/bookModel");
const catchAsync = require("../utils/catchAsync");

exports.getNewAndSalesAndBestsellerBooks = catchAsync(async (req, res, next) => {
    try {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    date.toDateString();
    const [newBooks, bestsellerBooks] = await Promise.all([
        Book.find({created: {$gte: date, 
            $lt: new Date()}}),
        Book.aggregate([
            { $sample: { size: 4 } }
        ])
      ]);
      res.json({
        newBooks: newBooks,
        bestsellerBooks: bestsellerBooks
    })
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});
