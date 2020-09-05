const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Post', PostSchema);