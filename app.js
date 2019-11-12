require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

var compression = require("compression");
var helmet = require("helmet");

var app = express();
var Block = require("./models/block");

// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.DATABASE;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let BlockChain = require("./blockchain/blockChain");

global.block_chain = new BlockChain();


let hash = require("object-hash");

let PROOF = 15;

// set chain from fb, add first block if chain empty
Block.find({})
  .then(blocks => {

    for(i=0; i <= blocks.length - 1; i++) {
      block_chain.chain.push(blocks[i])
    }
    
    
    console.log(block_chain.chain);
    console.log(block_chain.chain.length);
    console.log(block_chain.lastBlock())
    if (block_chain.isEmpty()) {
      block_chain.addNewBlock(null, "Alex", "Blah", "909", "12-24-2019");
    }
  })
  .catch(() => {
    console.log("Sorry! Something went wrong.");
  });





// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = block_chain;
module.exports = app;