// Create web server
// Import express
const express = require('express');
// Create an express server
const app = express();
// Import fs
const fs = require('fs');
// Import body-parser
const bodyParser = require('body-parser');
// Set the port
const port = 3000;
// Import the comments.json file
const comments = require('./comments.json');
// Use body-parser
app.use(bodyParser.json());
// Create a route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Create a route to get a single comment
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  res.json(comments[id]);
});
// Create a route to create a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});
// Create a route to update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  comments[id] = comment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});
// Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.splice(id, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});