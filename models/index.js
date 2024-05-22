const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

// db.address = require("./addressModel");
db.author = require("./authorModel");
// db.availability = require("./availabilityModel");
db.book = require("./bookModel");
db.category = require("./categoryModel");
db.language = require("./languageModel");
// db.order = require("./orderModel");
// db.payment = require("./paymentModel");
db.price = require("./priceModel");
db.publisher = require("./publisherModel");
// db.user = require("./userModel");

module.exports = db;