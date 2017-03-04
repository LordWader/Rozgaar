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


app.set('port', (process.env.PORT || 5000));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: '123456789', resave: false, saveUninitialized: true}));
app.use('/static',express.static('public'));

app.get('/', function(req,res){
  res.render('login', { title: "OZGAAR" });
})

app.get('/login', function(req,res){
  res.render('login', { title: "OZGAAR" });
})

app.post('/login', function(req,res){
  var inputUsername = req.body.user;
  var inputPassword = req.body.pass;
  console.log(req.body);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  GP_admins.findOne({ 'username': inputUsername }, 'password', function (err, GP_admins) {
    if (err) return handleError(err);
    if(!GP_admins) res.render('errorPage', { title: "OZGAAR", error: "ERROR: Username or Password incorrect!" });
    else if(GP_admins.password == inputPassword) res.render('index', { title: "OZGAAR" });
    else res.render('errorPage', { title: "OZGAAR", error: "ERROR: Username or Password incorrect!" });
  })

  })

app.post('/newUser', function(req,res){
  res.render('newUser', { title: "OZGAAR" });
})

app.post('/searchUser', function(req,res){
  res.render('searchUser', { title: "OZGAAR" });
})

app.listen('port',function(err){
  if (err) console.log(err);
  else console.log('Server is listening!');
});
