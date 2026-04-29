import { LlmMessage } from "../llm/types";
import { MemoryFact, MemoryStore } from "../memory/types";

interface BuildPromptInput {
  sessionId: string;
  userId: string;
  userText: string;
  memory: MemoryStore;
}

function formatFacts(facts: MemoryFact[]): string {
  if (facts.length === 0) return "No saved user facts yet.";

  return facts
    .map(
      (fact) => `- ${fact.key}: ${fact.value} (confidence: ${fact.confidence})`,
    )
    .join("\n");
}

export async function buildPromptContext(
  input: BuildPromptInput,
): Promise<LlmMessage[]> {
  const recentMessages = await input.memory.getRecentMessages(
    input.sessionId,
    8,
  );
  const facts = await input.memory.getFacts(input.userId);

  const systemMessage: LlmMessage = {
    role: "system",
    content:
      "You are Luna, a friendly desktop AI assistant. Detect user language and reply in the same language (Ukrainian or English). Keep responses concise and useful.",
  };

  const memoryMessage: LlmMessage = {
    role: "system",
    content: `Known user facts:\n${formatFacts(facts)}`,
  };

  const historyMessages: LlmMessage[] = recentMessages.map((m) => ({
    role: m.role,
    content: m.text,
  }));

  const userMessage: LlmMessage = {
    role: "user",
    content: input.userText,
  };

  return [systemMessage, memoryMessage, ...historyMessages, userMessage];
}
