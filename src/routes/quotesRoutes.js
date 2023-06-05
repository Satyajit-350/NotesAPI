const express = require("express");
const {createQuotes,getQuote} = require("../controllers/quotesController")
const quotesRouter = express.Router();


quotesRouter.post("/",createQuotes)

quotesRouter.get("/",getQuote)


module.exports = quotesRouter
