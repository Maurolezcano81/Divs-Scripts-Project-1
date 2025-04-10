import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
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
    enum: ['masculino', 'femenino', 'otro'],
    default: 'prefer not to say'
  },
  nationality: {
    type: String,
    trim: true
  },
  //##################
  emotions: [{
    type: Schema.Types.ObjectId,
    ref: 'Emotion',
    autopopulate: { select: 'mood intensity createdAt notes' }
  }],
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
  // Onboarding info
  archetype: [{
    type: Schema.Types.ObjectId,
    ref: 'Archetype',
    autopopulate: { select: 'cuidador explorador forajido heroe mago sabio' }
  }],
  temperament: [{
    type: Schema.Types.ObjectId,
    ref: 'Temperament',
    autopopulate: { select: 'colerico flematico melancolico sanguineo supino' }
  }],
  // On boarding classification result
  classifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Classification',
    autopopulate: { select: 'dominantArchetype dominantTemperament createdAt' }
  }]
}, {
  timestamps: true,
});

userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

export default User;