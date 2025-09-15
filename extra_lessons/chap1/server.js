import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// request
// Define a GET route at "/users"
app.get('/users', async (req, res) => {
    // Delay the response by 2 seconds (to simulate loading time)
    setTimeout(async () => {
        // Read the "limit" query parameter from the URL, default to 10
        // Example: /users?limit=5  → will only return 5 users
        const limit = +req.query.limit || 10;

        // Fetch user data from a public API (JSONPlaceholder)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
        const users = await response.json()   // Convert the response into a JS object/array

        // Send back an HTML response showing a list of user names
        res.send(`
            <h2>Users</h2>
            <ul class="list-group">
                ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
            </ul>
        `)
    }, 2000);  // 2000ms = 2 seconds delay
});


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});