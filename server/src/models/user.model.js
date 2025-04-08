import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  active: {
    type: Boolean,
    default: false
  },
  // campos demográficos
  birthDate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'prefer not to say', 'other'],
    default: 'prefer not to say'
  },
  nationality: {
    type: String,
    trim: true
  },
  ethnicity: {
    type: String,
    trim: true
  },
  //##################
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    autopopulate: { select: 'title messages' }
  }],
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
    autopopulate: { select: 'title content tags' }
  }],
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    autopopulate: { select: 'title description status' }
  }],
}, {
  timestamps: true,
});

userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

export default User;