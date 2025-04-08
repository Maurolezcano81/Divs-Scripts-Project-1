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
  }
}, {
  timestamps: true,
  paranoid: true,
});

userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

export default User;
