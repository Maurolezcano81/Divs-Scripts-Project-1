import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const classificationSchema = new Schema({
  archetypeScore: {
    Amante: { type: Number, required: true },
    Cuidador: { type: Number, required: true },
    Explorador: { type: Number, required: true },
    Forajido: { type: Number, required: true },
    Héroe: { type: Number, required: true },
    Mago: { type: Number, required: true },
    Sabio: { type: Number, required: true }
  },
  temperamentScore: {
    Colerico: { type: Number, required: true },
    Flematico: { type: Number, required: true },
    Melancolico: { type: Number, required: true },
    Sanguineo: { type: Number, required: true },
    Supino: { type: Number, required: true }
  },
  dominantArchetype: {
    type: String,
    required: true,
    enum: ['Amante', 'Cuidador', 'Explorador', 'Forajido', 'Héroe', 'Mago', 'Sabio']
  },
  dominantTemperament: {
    type: String,
    required: true,
    enum: ['Colerico', 'Flematico', 'Melancolico', 'Sanguineo', 'Supino']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  }
}, {
  timestamps: true
});

classificationSchema.post('save', async function (doc) {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    doc.user,
    { $addToSet: { classifications: doc._id } }
  );
});

classificationSchema.plugin(autopopulate);

const Classification = mongoose.model('Classification', classificationSchema);

export default Classification;
