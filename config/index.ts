export interface AppConfig {
  wakeWord: string;
  model: string;
  languages: string[];
}

export const config: AppConfig = {
  wakeWord: "luna",
  model: "qwen2.5:7b",
  languages: ["uk-UA", "en-US"],
};
