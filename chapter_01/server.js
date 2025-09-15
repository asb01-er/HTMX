import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// ChatGbt Summary
// Browser request → User visits /users?limit=5.
// Server receives request → Express matches /users route.
// Fetch data → Server requests user data from external API.
// Process & format → Convert JSON to HTML list.
// Send response → Server sends HTML to browser.
// Browser renders → User sees the list of users.

// request
app.get('/users', async (req, res) => {
    setTimeout(async ()=> {
    const limit = +req.query.limit || 10;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
    const users = await response.json()


    res.send(`
    <h2>Users</h2>
    <ul class="list-group">
    ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
    </ul>
    `)
    },2000);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
