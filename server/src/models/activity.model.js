import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const activitySchema = new Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'en-progreso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
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