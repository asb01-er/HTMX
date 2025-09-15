import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Chatgbt Summary
// Browser requests /get-price.
// Server waits 2 seconds.
// Server updates currentPrice randomly.
// Server sends formatted price (e.g., $102.3).
// Browser receives and displays the updated price.

// request
let currentPrice = 60;

app.get('/get-price', (req, res) => {
    setTimeout(async () => {
    currentPrice = currentPrice + Math.random() * 2 - 1;
    res.send('$' + currentPrice.toFixed(1))
    }, 2000)
})
// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});