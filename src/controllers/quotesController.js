const quotesModel = require("../models/quotes")


const createQuotes = async (req,res) =>{
    const {quote,author,image} = req.body;

    const newQuote = new quotesModel({
        quote: quote,
        author: author,
        image: image,
        // userId: req.userId
    })

    try {
        await newQuote.save();
        res.status(201).json(newQuote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
}

const getQuote = async (req, res) => {
    try {
        const quote = await quotesModel.aggregate([{ $sample: { size: 1 } }]);
        if (quote.length === 0) {
        res.status(404).json({ error: 'No quotes found' });
        } else {
        res.status(200).json(quote[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = {
    createQuotes,
    getQuote
}