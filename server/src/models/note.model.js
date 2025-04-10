import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
    autopopulate: { select: 'name email' }
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true,
});

noteSchema.post('save', async function(doc) {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    doc.user,
    { $addToSet: { notes: doc._id } }
  );
});

noteSchema.plugin(autopopulate);

const Note = mongoose.model('Note', noteSchema);

export default Note;