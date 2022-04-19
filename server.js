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
app.use(bodyParser.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res)=>{
  //note: this Regex i found on the internet it's way accurate than a one i wrote
  if(req.body['url'].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)){
    shortenedNum++;
    shortened[shortenedNum] = req.body['url'];

    res.json({'original_url':req.body['url'],'short_url':shortenedNum})
  }else{
    res.json({"error":"Invalid URL"})
  }
})

app.get('/api/shorturl/:number', (req, res) =>{
  if(shortened[req.params.number]){
    res.redirect(shortened[req.params.number])
  }else{
    res.json({"error":"No short URL found for the given input"})
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
