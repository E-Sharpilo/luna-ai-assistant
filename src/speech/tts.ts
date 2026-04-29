export interface TtsOptions {
  voice?: string;
  speed?: number;
}

export async function speak(
  text: string,
  _options?: TtsOptions,
): Promise<void> {
  void text;
}
