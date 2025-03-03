// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Add middleware to parse JSON body
app.use(express.json());

// Create an array of comments
let comments = [];

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = Date.now().toString();
  comments.push(comment);
  res.status(201).json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    comment.text = req.body.text;
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});