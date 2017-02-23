var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  username: String,
  password: String
})

var Admin = mongoose.model('Admin', AdminSchema);


module.exports = Admin;
