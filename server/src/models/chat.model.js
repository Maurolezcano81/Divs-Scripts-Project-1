import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import User from './user.model.js';

const messageSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: [true, 'El rol del mensaje es obligatorio']
  },
  content: {
    type: String,
    required: [true, 'El contenido del mensaje es obligatorio'],
    trim: true
  }
}, { timestamps: true });

const chatSchema = new Schema({
  title: {
    type: String,
    default: 'Nueva Conversación',
    trim: true,
    maxlength: [100, 'El título no puede exceder los 100 caracteres']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
  },
  messages: [messageSchema],

}, {
  timestamps: true,
});

chatSchema.virtual('lastMessage').get(function() {
  if (this.messages && this.messages.length > 0) {
    return this.messages[this.messages.length - 1];
  }
  return null;
});

chatSchema.virtual('messageCount').get(function() {
  return this.messages ? this.messages.length : 0;
});

chatSchema.post('save', async function(doc) {
  try {
    await User.findByIdAndUpdate(
      doc.user,
      { $addToSet: { chats: doc._id } }
    );
  } catch (error) {
    console.error('Error al actualizar la referencia del chat en el usuario:', error);
  }
});

chatSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.user,
        { $pull: { chats: doc._id } }
      );
    } catch (error) {
      console.error('Error al eliminar la referencia del chat en el usuario:', error);
    }
  }
});

chatSchema.plugin(autopopulate);
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;