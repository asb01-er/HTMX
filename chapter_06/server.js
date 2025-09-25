import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// chatgbt summary
// This route handles requests to /user/:id/edit.
// When triggered (e.g., by your “Click To Edit” button in the card), it returns an HTML form for editing the user’s profile.
// The form uses HTMX attributes to handle updating and canceling without a full page reload.

// Handle GET request for profile edit
// Route to render edit form
app.get('/user/:id/edit', (req, res) => {
  res.send(`
    <form hx-put="/user/${req.params.id}" hx-target="this" hx-swap="outerHTML">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="Ernest Ekelem">
        </div>
        <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea class="form-control" id="bio" name="bio">
Follower of Programming | Author of Best-selling Amazon Tech Books and Creator of Coding Courses
            </textarea>
        </div>
        <button type="submit" class="btn btn-primary">
            Save Changes
        </button>
        <button type="button" hx-get="/index.html" class="btn btn-secondary">
            Cancel
        </button>
    </form>
  `);
});

// Route to handle PUT request
app.use(express.urlencoded({ extended: true })); // needed to parse form data

app.put('/user/:id', (req, res) => {
  const { name, bio } = req.body;
  console.log(`Updating user ${req.params.id}:`, name, bio);

  // Example response: re-render updated profile
  res.send(`
    <div>
      <h3>${name}</h3>
      <p>${bio}</p>
      <button hx-get="/user/${req.params.id}/edit" class="btn btn-sm btn-outline-primary">
        Edit
      </button>
    </div>
  `);
});


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});