import { buildPromptContext } from "../context/buildPromptContext";
import { LlmClient } from "../llm/types";
import { MemoryStore } from "../memory/types";

export type AssistantMode = "idle" | "listening" | "thinking" | "speaking";

export interface AssistantState {
  mode: AssistantMode;
  lastCommand?: string;
}

export interface AssistantRequest {
  sessionId: string;
  userId: string;
  text: string;
}

export class AssistantCore {
  private state: AssistantState = { mode: "idle" };

  constructor(
    private readonly llm: LlmClient,
    private readonly memory: MemoryStore,
  ) {}

  public getState(): AssistantState {
    return this.state;
  }

  public async reply(input: AssistantRequest): Promise<string> {
    this.state = { ...this.state, mode: "thinking", lastCommand: input.text };

    await this.memory.addMessage({
      sessionId: input.sessionId,
      role: "user",
      text: input.text,
      timestamp: Date.now(),
    });

    const messages = await buildPromptContext({
      sessionId: input.sessionId,
      userId: input.userId,
      userText: input.text,
      memory: this.memory,
    });

    const assistantText = await this.llm.chat(messages);

    await this.memory.addMessage({
      sessionId: input.sessionId,
      role: "assistant",
      text: assistantText,
      timestamp: Date.now(),
    });

    this.state = { ...this.state, mode: "idle" };
    return assistantText;
  }
}
