const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

// db.address = require("./addressModel");
db.author = require("./authorModel.js");
// db.availability = require("./availabilityModel");
db.book = require("./bookModel");
db.category = require("./categoryModel.js");
db.language = require("./languageModel.js");
// db.order = require("./orderModel");
// db.payment = require("./paymentModel");
db.price = require("./priceModel.js");
db.publisher = require("./publisherModel.js");
// db.user = require("./userModel");

module.exports = db;