import mongoose from 'mongoose';

const seniorSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  
    unique: true, 
  },

  collegeName: {
    type: String,
    required: true,
    trim: true,
  },

  branch: {
    type: String,
    required: true,
    trim: true,
  },

  currentYear: {
    type: Number,
    required: true,
    min: 1,
    max: 6 // assuming max is 6 years (for some courses)
  },

  passingYear: {
    type: Number,
    required: true,
  },

  idCardURL:{
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
 
  },

  LinkedInUrl:{
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid LinkedIn URL!`
    }
  },

  ProfilePicture: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`,
      
    },
    default: process.env.DEFAULT_PROFILE_PIC_URL

  },

  createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

const Senior = mongoose.model('Senior', seniorSchema);

export default Senior;


