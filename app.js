var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var users = require('./models/users');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();


mongoose.connect('mongodb://dbroot:mitron@ds137759.mlab.com:37759/rozgaar_db',function(err){
  if (err) console.log(err);
  else console.log('Connected to DB!');
});
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: '123456789', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static',express.static('public'));

app.get('/', function(req,res){
  res.render('index', { title: "ROZGAAR" });
})

app.post('/login', function(req,res){
  var username = req.body.user;
  var password = req.body.pass;
  console.log(req.body);
})

app.get('/login', function(req,res){
  res.render('login', { title: "ROZGAAR" });
})

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));


app.listen(3000,function(err){
  if (err) console.log(err);
  else console.log('Server is listening!');
});
