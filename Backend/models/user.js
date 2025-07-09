import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    trim: true
  },

  password: {
    type: String,
    required: function () {
      return !this.isGoogleUser;
    }
  },

  googleId: {
    type: String,
    default: null
  },

  isGoogleUser: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
   lastLogin: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;