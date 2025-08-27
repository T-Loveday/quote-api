const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    res.json({ quote: getRandomElement(quotes) });
})
app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const filteredQuotes = quotes.filter(quote => quote.person === req.query.person);
        res.json({ quotes: filteredQuotes });
    } else {
        res.json({ quotes: quotes });
    }
})
app.post('/api/quotes', (req, res, next) => {
    const newQuote = {};
    if (req.query.quote && req.query.person) {
        newQuote.quote = req.query.quote;
        newQuote.person = req.query.person;
        quotes.push(newQuote);
        res.status(201).json({ quote: newQuote });
    } else {
        res.status(400).send();
    }
})
app.put('/api/quotes/:id', (req, res, next) => {
    const quoteId = req.params.id;
    if (quoteId >= 0 && quoteId < quotes.length) {
        if (req.query.quote) quotes[quoteId].quote = req.query.quote;
        if (req.query.person) quotes[quoteId].person = req.query.person;
        res.json({ quote: quotes[quoteId] });
    } else {
        res.status(404).send();
    }
})
app.delete('/api/quotes/:id', (req, res, next) => {
    const quoteId = req.params.id;
    if (quoteId >= 0 && quoteId < quotes.length) {
        const deletedQuote = quotes.splice(quoteId, 1);
        res.json({ quote: deletedQuote[0] });
    } else {
        res.status(404).send();
    }
})
app.listen(PORT, () => {
    console.log('Server is alive and listening on port ' + PORT);
})