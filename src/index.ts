import { config } from "../config/index";
import { AssistantCore } from "./core/assistant";
import { OllamaClient } from "./llm/ollamaClient";
import { InMemoryStore } from "./memory/inMemoryStore";

async function main(): Promise<void> {
  // Initialize scalable architecture layers.
  const llm = new OllamaClient(config.model);
  const memory = new InMemoryStore();
  const assistant = new AssistantCore(llm, memory);

  // Simulate a single request in current MVP.
  const response = await assistant.reply({
    sessionId: "local-session-1",
    userId: "local-user-1",
    text: "Hello! Briefly introduce yourself in English.",
  });

  console.log("\n=== Model response ===");
  console.log(response);
}

main().catch((error: unknown) => {
  // Print a readable error if Ollama is not running or model is missing.
  const message = error instanceof Error ? error.message : String(error);
  console.error("Ollama connection error:", message);
  process.exit(1);
});
