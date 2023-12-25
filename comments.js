// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments array
const commentsByPostId = {};

// Create route for getting comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for posting comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');

  // Get the request body
  const { content } = req.body;

  // Get the comments array
  const comments = commentsByPostId[req.params.id] || [];

  // Push the new comment to the array
  comments.push({ id: commentId, content });

  // Set the comments array
  commentsByPostId[req.params.id] = comments;

  // Send the status code and the comments array
  res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
  console.log('Listening on 4001');
});