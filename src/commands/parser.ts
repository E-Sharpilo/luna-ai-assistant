export type ParsedCommand =
  | { type: "open_google" }
  | { type: "search_google"; query: string }
  | { type: "time" }
  | { type: "unknown"; raw: string };

export function parseCommand(input: string): ParsedCommand {
  const text = input.trim().toLowerCase();

  if (text === "відкрий гугл" || text === "open google")
    return { type: "open_google" };
  if (text.startsWith("знайди в гуглі ")) {
    return { type: "search_google", query: input.slice(14).trim() };
  }
  if (text.startsWith("search google ")) {
    return { type: "search_google", query: input.slice(14).trim() };
  }
  if (
    text === "котра година" ||
    text === "яка година" ||
    text === "what time is it" ||
    text === "time"
  ) {
    return { type: "time" };
  }

  return { type: "unknown", raw: input };
}
