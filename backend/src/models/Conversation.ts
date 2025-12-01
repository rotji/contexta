import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  userId: string;
  createdAt: Date;
  transcript: string;
  aiResponse: string;
  nuancedOptions: any[];
}

const ConversationSchema = new Schema<IConversation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  transcript: { type: String, required: true },
  aiResponse: { type: String, default: '' },
  nuancedOptions: { type: [Schema.Types.Mixed], default: [] },
});

export const ConversationModel = mongoose.model<IConversation>('Conversation', ConversationSchema);
