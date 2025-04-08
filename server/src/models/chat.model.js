import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const messageSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new Schema({
  title: {
    type: String,
    default: 'New Conversation',
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    autopopulate: { select: 'name email' }
  },
  messages: [messageSchema]
}, {
  timestamps: true,
});

chatSchema.plugin(autopopulate);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
