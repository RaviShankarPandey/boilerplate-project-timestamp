// index.js
// where your node app starts

// init project
var express = require('express');
require('dotenv').config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function(req, res){
  const date = new Date();
  res.json({
    unix:date.getTime(),
    utc: date.toUTCString()
  })
});
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  console.log(date);
  let formattedDate = new Date(date);
  console.log(formattedDate);
  if(formattedDate.toString() === 'Invalid Date'){
    formattedDate = new Date(parseInt(date));
    console.log(formattedDate);
  }
  if(formattedDate.toString() === 'Invalid Date'){
    return res.json({ error : "Invalid Date" });
  }
  else{
    res.json({
      unix:formattedDate.getTime(),
      utc: formattedDate.toUTCString()
    })
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
