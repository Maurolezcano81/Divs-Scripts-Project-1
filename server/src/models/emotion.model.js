import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const emotionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    autopopulate: { select: 'name email' }
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'calm', 'angry', 'energetic', 'tired', 'neutral'],
    required: [true, 'Mood is required']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Intensity is required']
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

emotionSchema.post('save', async function(doc) {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    doc.user,
    { $addToSet: { emotions: doc._id } }
  );
});

emotionSchema.plugin(autopopulate);

const Emotion = mongoose.model('Emotion', emotionSchema);

export default Emotion;