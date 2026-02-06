// Contains all the prompt engineering code
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat";

export function buildPresentationPrompt(input: {
  prompt: string;
}): ChatCompletionMessageParam[] {
  const systemPrompt = `
You are an expert presentation content generator.

Rules:
- Output MUST be valid JSON
- Output MUST be in the exact format as given JSON Schema
- For every instance please do not return any plain text
- Only return the response in given JSON schema
- No markdown
- No explanations
- No extra text
- Follow the schema strictly
- Do NOT include pixel-based positioning
- Use semantic layout hints only
`;

  const developerPrompt = `
Generate structured presentation slide content optimized for a modern professional design by following the user prompt given below.

Design principles:
- One title per slide
- Include the title seperately in the title field of the schema
- Max 5 bullet points
- Bullets must be concise (≤ 12 words)
- Strong visual hierarchy
- Professional tone
- Pick an overall title for the presentation
- Include a cover slide with the picked title
- Take number of slides based on the user prompt
- If no slide number is mentioned take suitable amount of slides
- Don't exceed the total count of 20 slides when no slide number is mentioned

Color rules:
- Provide exactly ONE accent color in HEX
- Choose color based on topic emotion
- Avoid neon or overly bright colors

Layout options (choose one per slide):
- title_center
- title_left_bullets_right
- title_top_bullets_bottom
- two_column

Schema:
{
  "title": "Title of the presentation"
  "theme": {
    "accentColor": "#HEX",
    "background": "light | dark"
  },
  "slides": [
    {
      "layout": "layout_name",
      "title": "string",
      "content": [
      {
        "position": "top" | "left" | "right" | "bottom",
        "bullets": ["string"],
      }
    ]
    }
  ]
}
`;

  const userPrompt = `
Prompt: ${input.prompt}
`;

  return [
    { role: "system", content: systemPrompt },
    { role: "assistant", content: developerPrompt },
    { role: "user", content: userPrompt },
  ];
}
