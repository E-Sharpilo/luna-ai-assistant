import ollamaModule from "ollama";
import { LlmClient, LlmMessage } from "./types";

const ollama = ollamaModule;

export class OllamaClient implements LlmClient {
  constructor(private readonly model: string) {}

  public async chat(messages: LlmMessage[]): Promise<string> {
    const response = await ollama.chat({
      model: this.model,
      messages,
    });

    return response.message.content;
  }
}
