const mongoose = require('mongoose');

mongoose.connect('mongodb-connection-string');

const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    linkedinUrl: String,
    twitterUrl: String,
    interests: [String]
  });

  const user = mongoose.model('UserDetails', userSchema);

  module.exports = {
    user
  }