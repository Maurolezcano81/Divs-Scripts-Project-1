import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const activitySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    autopopulate: { select: 'name email' }
  }
}, {
  timestamps: true,
});

activitySchema.post('save', async function(doc) {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    doc.user,
    { $addToSet: { activities: doc._id } }
  );
});

activitySchema.plugin(autopopulate);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;