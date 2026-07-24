const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  parts: GeminiPart[];
}

export interface GeminiCandidate {
  content: GeminiContent;
  finishReason?: string;
}

export interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { message: string };
}

export function hasGeminiKey(): boolean {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  return typeof key === 'string' && key.trim().length > 0;
}

export function getGeminiKey(): string {
  return (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() ?? '';
}

export async function generateContent(
  prompt: string,
  systemInstruction?: string,
): Promise<string> {
  const apiKey = getGeminiKey();
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set');

  const body: Record<string, unknown> = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as GeminiResponse;

  if (data.error) {
    throw new Error(data.error.message);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned an empty response');

  return text;
}
