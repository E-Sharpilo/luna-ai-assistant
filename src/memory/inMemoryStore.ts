import { ChatMessage, MemoryFact, MemoryStore } from "./types";

export class InMemoryStore implements MemoryStore {
  private messages: ChatMessage[] = [];
  private facts: MemoryFact[] = [];

  public async addMessage(message: ChatMessage): Promise<void> {
    this.messages.push(message);
  }

  public async getRecentMessages(
    sessionId: string,
    limit: number,
  ): Promise<ChatMessage[]> {
    return this.messages
      .filter((m) => m.sessionId === sessionId)
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-limit);
  }

  public async saveFact(fact: MemoryFact): Promise<void> {
    const existingIndex = this.facts.findIndex(
      (f) => f.userId === fact.userId && f.key === fact.key,
    );

    if (existingIndex >= 0) {
      this.facts[existingIndex] = fact;
      return;
    }

    this.facts.push(fact);
  }

  public async getFacts(userId: string): Promise<MemoryFact[]> {
    return this.facts.filter((f) => f.userId === userId);
  }
}
