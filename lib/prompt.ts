// Contains all the prompt engineering code
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat";

const schema = `{
  "title": "Title of the presentation"
  "theme": {
    "accentColor": "#HEX",
    "background": "light | dark"
  },
  "slides": [
    {
      "id": "string"
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
}`;

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

Also generate an id for each slide which follows the convention s[slide number] (eg: s1,s2,s3,s4)

Schema:
${schema}
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

export function buildUpdatePrompt(input: {
  updatePrompt: string;
  currentSlide: string;
}): ChatCompletionMessageParam[] {
  const systemPrompt = `You are a presentation slide editor.

You will be given:
1) The full presentation schema (for reference).
2) The current slide JSON that must be updated.
3) A user change request describing what to edit.
`;

  const developerPrompt = `Task:
- Update ONLY the provided slide object.
- Do NOT output the full presentation.
- Do NOT output theme or other slides.
- Return ONLY valid JSON for the updated slide object (no markdown, no extra text).

Hard rules:
- Output MUST be valid JSON.
- Output MUST match this slide shape exactly:
  {
    "id": "string",
    "layout": "title_center" | "title_left_bullets_right" | "title_top_bullets_bottom" | "two_column",
    "title": "string",
    "content": [
      {
        "position": "top" | "left" | "right" | "bottom",
        "bullets": ["string"]
      }
    ]
  }

Constraints:
- Keep the same "id" as the input slide.
- Preserve any fields not mentioned in the change request.
- If layout is not explicitly requested to change, keep the current layout.
- Use semantic layout only (no pixel values).
- Max 5 bullets per content block.
- Each bullet ≤ 12 words.
- Professional tone, strong visual hierarchy.
- "content" must be an array (even if it has a single block).
- "bullets" must be an array of strings (no nested arrays).
- If the user asks to remove bullets/content, you may return an empty content array: "content": [].

Editing guidance:
- Prefer minimal edits that satisfy the request.
- If the request conflicts with constraints, comply with constraints and approximate the intent.
- Avoid adding new sections unless the request asks for it.

[SCHEMA_REFERENCE]
${schema}
`;

  const userPrompt = `Now perform the update using the inputs below.

[CURRENT_SLIDE_JSON]
${input.currentSlide}

[CHANGE_REQUEST]
${input.updatePrompt};
`;

  return [
    { role: "system", content: systemPrompt },
    { role: "developer", content: developerPrompt },
    { role: "user", content: userPrompt },
  ];
}
