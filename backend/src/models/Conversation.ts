export interface Conversation {
  id: string;
  userId: string;
  createdAt: Date;
  transcript: string;
  aiResponse: string;
  nuancedOptions: any[];
}

// For a real app, use a database model/schema (e.g., Mongoose, Prisma, Sequelize)
// Here, we'll use an in-memory array for MVP/demo
export const conversations: Conversation[] = [];
