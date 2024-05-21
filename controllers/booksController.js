const Book = require("../models/bookModel");
const catchAsync = require("../utils/catchAsync");

exports.getNewBooks = catchAsync(async (req, res, next) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.toDateString();
    const books = await Book.find({created: {$gte: date, 
        $lt: new Date()}});

    res.status(200).json({
        status: "success",
        results: books.length,
        data: {
            books,
        },
    });
});