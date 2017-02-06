'use strict';

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  city: String,
  state: String,
  name: String
});

module.exports = mongoose.model("BCUser", UserSchema);