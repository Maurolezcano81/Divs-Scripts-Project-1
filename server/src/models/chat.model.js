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

chatSchema.virtual('lastMessage').get(function() {
  if (this.messages && this.messages.length > 0) {
    return this.messages[this.messages.length - 1];
  }
  return null;
});

chatSchema.post('save', async function(doc) {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    doc.user,
    { $addToSet: { chats: doc._id } }
  );
});

chatSchema.plugin(autopopulate);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;