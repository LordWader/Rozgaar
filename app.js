var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GP_admins = require('./models/GP_admins');
var users = require('./models/users');
var session = require('express-session');
var dbURL = 'mongodb://dbroot:mitron@ds137759.mlab.com:37759/rozgaar_db';

var app = express();


mongoose.connect(dbURL,function(err){
  if (err) console.log(err);
  else console.log('Connected to DB!');
});
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: '123456789', resave: false, saveUninitialized: true}));
app.use('/static',express.static('public'));

app.get('/', function(req,res){
  res.render('index', { title: "ROZGAAR" });
})

app.get('/login', function(req,res){
  res.render('login', { title: "ROZGAAR" });
})

app.get('/newUser', function(req,res){
  res.render('newUser', { title: "ROZGAAR" });
})

app.post('/login', function(req,res){
  var username = req.body.user;
  var password = req.body.pass;
  console.log(req.body);

})

app.listen(3000,function(err){
  if (err) console.log(err);
  else console.log('Server is listening!');
});
