import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const emotionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
  },
  mood: {
    type: String,
    enum: ['feliz', 'triste', 'ansioso', 'calmado', 'enojado', 'energético', 'cansado', 'neutral'],
    required: [true, 'El estado de ánimo es obligatorio']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'La intensidad es obligatoria']
  },
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