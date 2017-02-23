var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = new Schema({
  jobcard_no: Number,
  family_id: Number,
  adhar_no: Array,
  mobile: Array,
  name: Array,
})

var Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;
