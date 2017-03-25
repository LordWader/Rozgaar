var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var QrCode = require('qrcode-reader');

var GP_admins = require('./models/GP_admins');
var Users = require('./models/users');
var adhaarNav = require('./navigation/adhaar')

var dbURL = 'mongodb://dbroot:mitron@ds137759.mlab.com:37759/rozgaar_db';
var app = express();
var qr = new QrCode();


mongoose.connect(dbURL,function(err){
  if (err) console.log(err);
  else console.log('Connected to DB!');
});

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

app.post('/home', function(req,res){
  res.render('index', { title: "OZGAAR" });
})

app.post('/search', function(req,res){
    var inputUsername = req.body.jobNo;
    console.log(req.body);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    Users.findOne({ 'jobNo': inputUsername }, ['name','mobile','grampanchayat','adhar_no','jobNo','img'], function (err, users) {
      if (err) return handleError(err);
      if(!users) res.render('errorPage', { title: "OZGAAR", error: "ERROR: Incorrect JOBCARD NUMBER entered!" });
      else {
        console.log(users);
        res.render('worker', {
          title: "OZGAAR",
          jobNo: users.jobNo,
          img0: users.img[0],
          img1: users.img[1],
          img2: users.img[2],
          name0: users.name[0],
          name1: users.name[1],
          name2: users.name[2],
          num0: users.mobile[0],
          num1: users.mobile[1],
          num2: users.mobile[2],
          adhar0: users.adhar_no[0],
          adhar1: users.adhar_no[1],
          adhar2: users.adhar_no[2],
          gp: users.grampanchayat
        });
      };
    })

  })

app.post('/newUser', function(req,res){
  res.render('newUser', { title: "OZGAAR" });
})

app.post('/adhaar1', function(req,res){
  res.render('adhaar/1', { title: "OZGAAR" });
  var context = req.body.qr;
  var data = context.getImageData(0, 0, width, height);
  qr.decode(data);
})

app.post('/adhaar2', function(req,res){
  res.render('adhaar/2', { title: "OZGAAR" });
})

app.post('/searchUser', function(req,res){
  res.render('searchUser', { title: "OZGAAR" });
})

app.listen((process.env.PORT || 5000),function(err){
  if (err) console.log(err);
  else console.log('Server is listening!');
});
