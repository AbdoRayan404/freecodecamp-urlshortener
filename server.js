require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

//used as a reference to order the shortened url's
let shortenedNum = 1
// Shortened links registered
let shortened = {
  '1': "https://github.com/Terry-404"
}

app.use(cors());
app.use(bodyParser.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
