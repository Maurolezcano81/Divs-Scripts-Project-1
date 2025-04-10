import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const classificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  archetypeScore: {
    type: Schema.Types.Mixed,
    required: [true, 'Los puntajes de arquetipos son obligatorios']
  },
  temperamentScore: {
    type: Schema.Types.Mixed,
    required: [true, 'Los puntajes de temperamentos son obligatorios']
  },
  dominantArchetype: {
    type: String,
    required: [true, 'El arquetipo dominante es obligatorio']
  },
  dominantTemperament: {
    type: String,
    required: [true, 'El temperamento dominante es obligatorio']
  },
}, {
  timestamps: true,
});

classificationSchema.post('save', async function(doc) {
  if (doc.user) {
    try {
      const User = mongoose.model('User');
      await User.findByIdAndUpdate(
        doc.user,
        { $addToSet: { classifications: doc._id } }
      );
    } catch (error) {
      console.error('Error al actualizar la referencia del usuario:', error);
    }
  }
});

classificationSchema.plugin(autopopulate);

const Classification = mongoose.model('Classification', classificationSchema);

export default Classification;
