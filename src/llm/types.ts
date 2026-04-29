export interface LlmMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LlmClient {
  chat(messages: LlmMessage[]): Promise<string>;
}
