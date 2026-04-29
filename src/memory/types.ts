export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  sessionId: string;
  role: ChatRole;
  text: string;
  timestamp: number;
}

export interface MemoryFact {
  userId: string;
  key: string;
  value: string;
  confidence: number;
  updatedAt: number;
}

export interface MemoryStore {
  addMessage(message: ChatMessage): Promise<void>;
  getRecentMessages(sessionId: string, limit: number): Promise<ChatMessage[]>;
  saveFact(fact: MemoryFact): Promise<void>;
  getFacts(userId: string): Promise<MemoryFact[]>;
}
