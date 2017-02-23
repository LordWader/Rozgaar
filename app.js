var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var users = require('./models/users');
var app = express();

app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static',express.static('public'));

app.get('/', function(req,res){
  res.render('index', { title: "ROZGAAR" });
})

app.post('/login', function(req,res){
  var username = req.body.user;
  var password = req.body.pass;
  console.log(req.body);
})

mongoose.connect('mongodb://dbroot:mitron@ds137759.mlab.com:37759/rozgaar_db',function(err){
  if (err) console.log(err);
  else console.log('Connected to DB!');
});

app.listen(3000,function(err){
  if (err) console.log(err);
  else console.log('Server is listening!');
});
