// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

app.use(express.static('public'));

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});