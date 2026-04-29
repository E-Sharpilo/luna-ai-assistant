export interface SttResult {
  text: string;
  confidence?: number;
}

export async function transcribeAudio(_input?: Buffer): Promise<SttResult> {
  return { text: "" };
}
