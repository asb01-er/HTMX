import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request for profile edit
app.get('/user/:id/edit', (req, res) => {
    // send an HTML form for editing
    res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="Ernest Ekelem">
        </div>
        <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea type="text" class="form-control" id="bio" name="Ernest">Follower of Christ |
            Author of Best-selling Amazon Tech Books and Creator of Coding Courses
            </textarea>
        </div>
        <button type="submit" class="btn btn-primary">
            Save Changes
        </button>
        <button type="submit" hx-get="/index.html"
            class="btn btn-secondary">
            Cancel
        </button>
    </form>
    `);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});